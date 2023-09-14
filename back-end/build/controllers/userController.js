"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.loginUser = exports.createUser = exports.getallUsers = exports.getUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const authService_1 = require("../services/authService");
const getUser = async (req, res, next) => {
    let usr = await (0, authService_1.verifyUser)(req);
    if (usr) {
        let users = user_1.user.findAll();
        res.status(200).json(users);
    }
    else {
        res.status(401).send();
    }
};
exports.getUser = getUser;
const getallUsers = async (req, res, next) => {
    let usr = await (0, authService_1.verifyUser)(req);
    if (usr) {
        let users = await user_1.user.findAll();
        res.status(200).json(users);
    }
    else {
        res.status(401).send();
    }
};
exports.getallUsers = getallUsers;
const createUser = async (req, res, next) => {
    try {
        let newUser = req.body;
        if (newUser.username && newUser.password) {
            let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
            newUser.password = hashedPassword;
            let created = await user_1.user.create(newUser);
            res.status(201).json({
                username: created.username,
                userId: created.userId
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch {
        res.status(500).send();
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    try {
        // Look up user by their username
        console.log(req.body);
        let existingUser = await user_1.user.findOne({
            where: { username: req.body.username }
        });
        // If user exists, check that password matches
        if (existingUser) {
            let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
            // If passwords match, create a JWT
            if (passwordsMatch) {
                let token = await (0, authService_1.signUserToken)(existingUser);
                res.status(200).json(token);
            }
            else {
                res.status(401).json('Invalid password');
            }
        }
        else {
            res.status(401).json('Invalid username');
        }
    }
    catch {
        res.status(500).send();
    }
};
exports.loginUser = loginUser;
const verify = async (req, res, next) => {
    try {
        let usr = await (0, authService_1.verifyUser)(req);
        if (usr) {
            res.status(200).send(true);
        }
        else {
            res.status(200).send(false);
        }
    }
    catch {
        res.status(500).send();
    }
};
exports.verify = verify;
