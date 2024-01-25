import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function App() {
    const [clients, setClients] = useState([]);
    const [newClient, setNewClient] = useState({
        name: '',
        email: '',
        phone: '',
        x_point: '',
        y_point: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [optimizedRoute, setOptimizedRoute] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to fetch the optimized route from the backend
    const fetchOptimizedRoute = async() => {
        try {
            const response = await axios.get('http://localhost:3001/optimize-route');
            console.log(response.data.route);
            setOptimizedRoute(response.data.route);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching optimized route:', error);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to fetch clients from the backend with optional search
    const fetchClients = useCallback(async() => {
        try {
            const response = await axios.get(`http://localhost:3001/clients?search=${searchTerm}`);
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    // Function to handle form input changes
    const handleInputChange = (e) => {
        setNewClient({...newClient, [e.target.name]: e.target.value });
    };

    // Function to handle search input changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to submit new client
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            // Make sure to send x_point and y_point as numbers
            const coordinates = {
                x_point: parseFloat(newClient.x_point) || 0,
                y_point: parseFloat(newClient.y_point) || 0
            };
            await axios.post('http://localhost:3001/clients', {...newClient, ...coordinates });
            fetchClients(); // Refresh the client list
            setNewClient({
                name: '',
                email: '',
                phone: '',
                x_point: '',
                y_point: ''
            });
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };

    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        h1 > Client Management System < /h1> < /
        header >

        <
        div className = "client-form" >
        <
        form onSubmit = { handleSubmit } >
        <
        input type = "text"
        name = "name"
        placeholder = "Name"
        value = { newClient.name }
        onChange = { handleInputChange }
        /> <
        input type = "email"
        name = "email"
        placeholder = "Email"
        value = { newClient.email }
        onChange = { handleInputChange }
        /> <
        input type = "text"
        name = "phone"
        placeholder = "Phone"
        value = { newClient.phone }
        onChange = { handleInputChange }
        /> <
        input type = "text"
        name = "x_point"
        placeholder = "X Coordinate"
        value = { newClient.x_point }
        onChange = { handleInputChange }
        /> <
        input type = "text"
        name = "y_point"
        placeholder = "Y Coordinate"
        value = { newClient.y_point }
        onChange = { handleInputChange }
        /> <
        button type = "submit" > Add Client < /button> < /
        form > <
        /div>

        <
        div className = "optimize-route-button" >
        <
        button onClick = { fetchOptimizedRoute } > Optimize Route < /button> < /
        div >

        {
            isModalOpen && ( <
                div className = "modal" >
                <
                div className = "modal-content" >
                <
                h2 > Optimized Route: < /h2> <
                ol > {
                    optimizedRoute.map((client, index) => ( <
                        li key = { index } > { client.name } < /li>
                    ))
                } <
                /ol> <
                button onClick = { closeModal } > Close < /button> < /
                div > <
                /div>
            )
        }

        <
        div className = "client-search" >
        <
        input type = "text"
        placeholder = "Search Clients"
        value = { searchTerm }
        onChange = { handleSearchChange }
        /> <
        button onClick = { fetchClients } > Search < /button> < /
        div >

        <
        div className = "client-list" >
        <
        h2 > Clients < /h2> <
        table >
        <
        thead >
        <
        tr >
        <
        th > Name < /th> <
        th > Email < /th> <
        th > Phone < /th> <
        th > X Coordinate < /th> <
        th > Y Coordinate < /th> < /
        tr > <
        /thead> <
        tbody > {
            clients.map(client => ( <
                tr key = { client.id } >
                <
                td > { client.name } < /td> <
                td > { client.email } < /td> <
                td > { client.phone } < /td> <
                td > { client.x_point } < /td> <
                td > { client.y_point } < /td> < /
                tr >
            ))
        } <
        /tbody> < /
        table > <
        /div> < /
        div >
    );
}

export default App;