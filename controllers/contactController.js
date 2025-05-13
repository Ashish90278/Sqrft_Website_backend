const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
    try {
        const { name, email, service, phone, message, agree } = req.body;

        // Validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Save to database
        const newContact = new Contact({ name, email, service, phone, message, agree });
        const savedContact = await newContact.save();

        res.status(201).json({
            message: 'Contact saved successfully',
            contact: savedContact,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        // Validation
        if (!id) {
            return res.status(400).json({ message: 'Contact ID is required' });
        }

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully', contact: deletedContact });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createContact, getContacts, deleteContact };