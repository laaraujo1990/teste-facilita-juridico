CREATE TABLE clients
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    x_point INTEGER,
    y_point INTEGER,
    created_at TIMESTAMP DEFAULT current_timestamp
);
