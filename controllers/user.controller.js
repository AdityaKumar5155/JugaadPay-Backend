const getProfileService = require('../services/user.services/get_profile.user.service');
const updateUserService = require('../services/user.services/update.user.service');
const updateUserSchema = require('../schemas/user.schemas/update_user.user.schema');

// Get the profile of the authenticated user
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await getProfileService(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the profile.' });
  }
};

// Update the profile of the authenticated user
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = updateUserSchema.safeParse(req.body);
    if (!result.success) {
      const errors = JSON.parse(result.error).errors.map(e => e.message);
      return res.status(400).json({ message: errors[0] || 'Invalid input', errors });
    }
    const data = result.data;
    const updatedUser = await updateUserService(userId, data);
    res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

module.exports = { getProfile, updateUser };
