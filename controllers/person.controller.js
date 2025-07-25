const createPersonSchema = require("../schemas/person.schemas.js/create.person.schema");
const createPersonService = require("../services/person.services/create.person.service");
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
    res.status(500).json({ error: 'An error occurred while creating the person.' });
  }
}

const updatePerson = async (req, res) => {
    try {
        const userId = req.user.id;
        const personId = req.params.id;
        const result = createPersonSchema.safeParse(req.body);
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
        res.status(500).json({ error: 'An error occurred while updating the person.' });
    }
}

module.exports = {
  createPerson,
  updatePerson
}