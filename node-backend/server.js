const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Create a new Express application
const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up PostgreSQL connection using Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

// Verify database connection
pool.connect()
    .then(() => console.log('Connected successfully to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

// Define a simple route for testing
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Client Management System!" });
});

// Client routes
app.get('/clients', async(req, res) => {
    try {
        const { search } = req.query;
        let query = 'SELECT * FROM clients';

        if (search) {
            query += ` WHERE name LIKE $1 OR email LIKE $1 OR phone LIKE $1`;
            const values = [`%${search}%`];
            const clientList = await pool.query(query, values);
            res.json(clientList.rows);
        } else {
            const clientList = await pool.query(query);
            res.json(clientList.rows);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/clients', async(req, res) => {
    try {
        const { name, email, phone, x_point, y_point } = req.body;
        const newClient = await pool.query(
            'INSERT INTO clients (name, email, phone, x_point, y_point) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, phone, x_point, y_point]
        );
        res.json(newClient.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/optimize-route', async(req, res) => {
    try {
        // Retrieve all clients with their coordinates
        const clientsQuery = await pool.query('SELECT * FROM clients');
        let clients = clientsQuery.rows;

        // The company's starting point
        let currentLocation = { x: 0, y: 0 };
        let route = [{ name: 'Company', x_point: 0, y_point: 0 }]; // Starting with the company

        let totalDistance = 0;

        while (clients.length > 0) {
            // Find the nearest client
            let nearest = clients.reduce((nearest, client) => {
                let distance = Math.hypot(client.x_point - currentLocation.x, client.y_point - currentLocation.y);
                return (nearest.distance < distance) ? nearest : { client, distance };
            }, { client: null, distance: Infinity });

            if (nearest.client) {
                // Add nearest client to route and remove from list
                route.push({ name: nearest.client.name, x_point: nearest.client.x_point, y_point: nearest.client.y_point });
                clients = clients.filter(client => client.id !== nearest.client.id);
                currentLocation = { x: nearest.client.x_point, y: nearest.client.y_point };
                totalDistance += nearest.distance;
            }
        }

        // Optionally, add the distance back to the company's starting point
        totalDistance += Math.hypot(currentLocation.x, currentLocation.y);

        // Return the visitation order and total distance of the route
        res.json({ route, totalDistance });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});