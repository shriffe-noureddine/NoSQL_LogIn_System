// Import the Mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Function to establish a connection to the MongoDB database
const connectDb = async () => {
  try {
    // Attempt to connect to the database using the connection string from the environment variables
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);

    // Log a success message with the host and database name
    console.log(
      "Database connected: ",
      connect.connection.host, // Host of the connected database
      connect.connection.name // Name of the connected database
    );
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.log(err);

    // Exit the process with a failure status code (1) if the connection fails
    process.exit(1);
  }
};

// Export the function to be used in other parts of the application
module.exports = connectDb;
