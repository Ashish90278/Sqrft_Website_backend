const express = require('express');
const { createContact, getContacts, deleteContact } = require('../controllers/contactController');
const router = express.Router();

// POST: Create a new contact
router.post('/', createContact);

// GET: Get all contacts
router.get('/', getContacts);

// DELETE: Delete a contact by ID
router.delete('/:id', deleteContact);

module.exports = router;