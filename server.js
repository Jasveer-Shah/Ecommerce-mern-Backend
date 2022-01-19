
const app = require('./app');
const dotenv = require('dotenv')
const connectDatabase = require("./config/database");//module imported

//Handling UncaughtException
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the Server due to Uncaught Exception`);
    process.exit(1)
})
// config
dotenv.config({path:"backend/config/config.env"});
//connecting to database after dotenv
connectDatabase();   // calback

const server = app.listen(process.env.PORT, () => {
    console.log(`APP IS LISTENING AT ${process.env.PORT}`)
})


//console.log(Youtube)   it gives -- Error: Youtube is not defined
//Shutting Down the Server due to Uncaught Exception

// Unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() =>{
        process.exit(1)
    });
});