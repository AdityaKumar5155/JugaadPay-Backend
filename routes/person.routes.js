const express = require('express');
const router = express.Router();

const { createPerson, updatePerson, getPersonById, getAllPersons } = require('../controllers/person.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to create a new person
router.post('/create', authMiddleware, createPerson);
// Route to update an existing person
router.put('/update/:id', authMiddleware, updatePerson);
// Route to get a person by ID
router.get('/:id', authMiddleware, getPersonById);
// Route to get all persons for the authenticated user
router.get('/', authMiddleware, getAllPersons);

module.exports = router;
