const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'click-mart-secret-key';

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

User.signIn = async function signIn(req, res) {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful!', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = User;