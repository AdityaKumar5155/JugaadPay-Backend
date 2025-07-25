const createPersonSchema = require("../schemas/person.schemas.js/create.person.schema");
const updatePersonSchema = require("../schemas/person.schemas.js/update.person.schema");
const createPersonService = require("../services/person.services/create.person.service");
const getByUserIdPersonService = require("../services/person.services/get_by_user_id.person.service");
const getPersonByIdService = require("../services/person.services/get_person_by_id.service");
const updatePersonService = require("../services/person.services/update.person.service");


const createPerson = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = createPersonSchema.safeParse(req.body);
    if (!result.success) {
        const errors = JSON.parse(result.error);
        return res.status(400).json({ message: errors?.[0]?.message || 'Invalid input', errors: errors || [] });
    }
    const data = result.data;
    await createPersonService(data, userId);
    res.status(200).json({
        success: true,
        message: 'Person created successfully'
    });
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'An error occurred while creating the person.' });
  }
}

const updatePerson = async (req, res) => {
    try {
        const userId = req.user.id;
        const personId = req.params.id;
        const result = updatePersonSchema.safeParse(req.body);
        if (!result.success) {
            const errors = JSON.parse(result.error);
            return res.status(400).json({ message: errors?.[0]?.message || 'Invalid input', errors: errors || [] });
        }
        const data = result.data;
        await updatePersonService(personId, data, userId);
        res.status(200).json({
            success: true,
            message: 'Person updated successfully'
        })
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'An error occurred while updating the person.' });
    }
}

const getAllPersons = async (req, res) => {
    try {
        const userId = req.user.id;
        const persons = await getByUserIdPersonService(userId);
        res.status(200).json({
            success: true,
            data: persons
        });
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'An error occurred while fetching persons.' });
    }
}

const getPersonById = async (req, res) => {
    try {
        const userId = req.user.id;
        const personId = req.params.id;
        const person = await getPersonByIdService(personId, userId);
        if (!person) {
            return res.status(404).json({ success: false, message: 'Person not found' });
        }
        res.status(200).json({ success: true, data: person });
    } catch (error) {
        console.error('Error fetching person by ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching the person.' });
    }
}

module.exports = {
  createPerson,
  updatePerson,
  getPersonById,
  getAllPersons
}