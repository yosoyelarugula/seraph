const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded bodies

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from different directories

app.use('/storage', express.static(path.join(__dirname, 'storage')));
app.use('/apps', express.static(path.join(__dirname, 'apps')));
app.use('/games', express.static(path.join(__dirname, 'games')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/seraphim', express.static(path.join(__dirname, 'seraphim')));

// Serve the main HTML files

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'index.html'));

});

app.get('/404', (req, res) => {

    res.sendFile(path.join(__dirname, '404.html'));

});

app.get('/host', (req, res) => {

    res.sendFile(path.join(__dirname, 'host.html'));

});

app.get('/settings', (req, res) => {

    res.sendFile(path.join(__dirname, 'settings.html'));

});

app.get('/offline', (req, res) => {

    res.sendFile(path.join(__dirname, 'offline.html'));

});

app.get('/updatelog', (req, res) => {

    res.sendFile(path.join(__dirname, 'updatelog.html'));

});

// Service Worker route
app.get('/offline-worker.js', (req, res) => {

    res.sendFile(path.join(__dirname, 'offline-worker.js'));

});

// Error handling middleware
app.use((req, res, next) => {

    res.status(404).sendFile(path.join(__dirname, '404.html'));

});

app.use((err, req, res, next) => {

    console.error(err.stack);
    res.status(500).send('Something broke!');

});

// Start the server
app.listen(port, () => {

    console.log(`Server is running on http://localhost:${port}`);
    
});