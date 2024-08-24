const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Register a new user
const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json('All fields are required');
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(409).json('Email already present, try to login');
        }

        let saltRounds = 10;
        let hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save(); // Save the user to the database

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// User login
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json('All fields are required');
        }

        const existUser = await userModel.findOne({ email });
        if (!existUser) {
            return res.status(404).json('Email is not registered. Please try to register.');
        }

        const isPasswordValid = await bcrypt.compare(password, existUser.password);
        if (!isPasswordValid) {
            return res.status(401).json('Incorrect password');
        }

        const payload = { email: existUser.email, id: existUser._id, role: existUser.role };
        const secret_key = process.env.SECRET_KEY;

        jwt.sign(payload, secret_key, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                console.log('JWT sign error:', err.message);
                return res.status(500).json('Internal server error');
            }
            res.status(200).json({ user: existUser, token: token });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllUsers, userRegister, userLogin };
