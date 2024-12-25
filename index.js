const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDb();

// Create an Express application
const app = express();
const port = process.env.PORT || 5000;

//to access the body being parsed req.body
app.use(express.json());

app.use(errorHandler);

// use the app as middleware
app.use("/api/contacts", require("./route/contactRoute"));
app.use("/api/users", require("./route/userRoute"));

app.use(errorHandler);
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
