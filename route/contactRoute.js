// Import the Express library
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import controller functions for handling the routes
const {
  getContacts, 
  getContact, 
  createContact,
  updateContact, 
  deleteContact,
} = require("../controllers/contactController");


const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
// Define a route to get all contacts
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// Export the router to use it in other parts of the application
module.exports = router;
