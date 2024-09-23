import User from '../models/user-model.js';
import { Request, Response, NextFunction } from 'express';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    //get  all users from the database
    try{
        const users = await User.find();
        return res.status(200).json({message: "OK", users})
    } catch(error){
        console.log(error)
        return res.status(400).json({message: "ERROR", cause:error.message})
    }
}

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    //user signup
    try{
        const {name, email, password} = req.body;
        
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            console.log("User already exists")
            return res.status(401).json({message: "ERROR", cause:"User already exists"})
        }
        //hash password
        const hashedPassword = await hash(password, 12);
        //create new user
        const user = new User({name, email, password: hashedPassword});
        //Save new user
        await user.save()

        //remove existing token
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");

        // Set expiration date for cookie
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        // Set cookie with new token
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });


        return res.status(200).json({message: "OK", name: existingUser.name, email: existingUser.email})
    } catch(error){
        console.log(error)
        return res.status(401).json({message: "ERROR", cause:error.message})
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    //user login
    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({message: "ERROR", cause:"Invalid email"})
        }

        //check if password is correct
        const isPasswordCorrect = await compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Inncorrect password")
        }
        
        //remove existing token
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        //create new token
        const token = createToken(existingUser._id.toString(), existingUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        //set new token
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({message: "OK", name: existingUser.name, email: existingUser.email})

    } catch(error){
        console.log(error)
        return res.status(400).json({message: "ERROR", cause:error.message})
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    //
    try{
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or Token Maulfunctioned")
        }
        //console.log(user._id.toString(), res.locals.jwtData.id)
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permision denied")
        }

        return res.status(200).json({message: "OK", name: user.name, email: user.email});
    } catch(error){
        console.log(error)
        return res.status(200).json({message: "ERROR", cause:error.message})
    }
        
}

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    //
    try{
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or Token Maulfunctioned")
        }
        //console.log(user._id.toString(), res.locals.jwtData.id)
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permision denied")
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        return res.status(200).json({message: "Logged Out"});
    } catch(error){
        console.log(error)
        return res.status(200).json({message: "ERROR", cause:error.message})
    }
        
}