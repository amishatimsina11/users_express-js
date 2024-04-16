import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
//import verifyToken from '../middlewares/tokens.js';


// Authentication middleware
// const authenticate = (req, res, next) => {
//     if (!req.session.userId) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     next();
//};

const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, 'secret-key', { expiresIn: '1h' });
};

const signUp = async (req, res) => {
    // Implementation of signup logic
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
       res.sendStatus(400).send(errors);
       //json({ errors: errors.array() });
    } else {
    const { username,displayName, password } = req.body;
    const saltRounds = 10;
    console.log(username);
    console.log(displayName);
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try{
        const user = new User({ username, displayName, password: hashedPassword });
        console.log(user);
        req.session.user = user;
        await user.save();
        const token = generateToken(user);
        return res.cookie('jwt', token, { httpOnly: true }).sendStatus(201); 
    } catch (err){
        console.log(err);
        return res.sendStatus(400);
    }
}
};

const logIn = async (req, res) => {
    // Implementation of login logic
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //console.log(errors);
        return res.sendStatus(400).send(errors);
        //json({errors: errors.array() });
    } else {
    const { username, password } = req.body;
        try{
            const user = await User.findOne({ username });
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (user && isPasswordValid){
                req.session.userId = user._id;
                return res.sendStatus(200);
            } else { 
                res.send('Invalid username or password');
            }
            const token = jwt.sign({ username: user.username }, 'Your_Secret_Key', { expiresIn: '1h' });
            return res.sendStatus(200).send({ message: 'Login Successfull'}).cookie('jwt', token, { httpOnly: true });
        } catch (err) {
            console.log(err);
            return res.sendStatus(400);
        }
    }
};

export { 
    signUp,
    logIn,
};