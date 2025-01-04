CREATE TABLE letters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    sender VARCHAR(255),
    recipient VARCHAR(255),
    date DATE,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);