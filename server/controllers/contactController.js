// with asyncHandler we don’t have to write try catch blocks, whenever an exception is called, it passes it to the error handler
const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id); 
  if (!contact) {
    res.status(404); 
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc Create new contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body; // Destructure the request body
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
  res.status(201).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body, // Update with request body
    { new: true } // Return the updated document
  );
  res.status(200).json(updatedContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(403);
  if (contact.user_id.toString() !== req.user.id) {
    throw new Error("User doesn't have permission to delete other users' contacts");
  }
  await Contact.deleteOne(contact);
  res.status(200).json(contact);
});

// export the functions to be used in contactRoutes
module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
