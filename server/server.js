const app = require('./app');
const port = process.env.PORT || 4000;

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    process.exit(1);
})

const server = app.listen( port, () => {console.log(`Server is running on port ${port}`)})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
});