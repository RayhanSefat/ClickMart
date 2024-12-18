const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const User = {};

User.hashingKey = 10;

User.getAllUsers = async function getAllUsers(req, res) {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

User.addUser = async function addUser(req, res) {
    const { firstName, lastName, email, username, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !username || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, User.hashingKey);

        const newUser = new userModel({
            firstName,
            lastName,
            email,
            username,
            hashedPassword,
            profilePictuteDirectory: '',
        });

        await newUser.save();

        res.status(201).json({ message: 'User added successfully!', user: { username, email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = User;