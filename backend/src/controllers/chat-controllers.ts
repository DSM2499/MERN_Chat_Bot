import { NextFunction, Request, Response } from 'express';
import User  from '../models/user-model.js';
import { configureOpenAI } from '../config/openai-config.js';
//import { ChatCompletionRequestMessage }  from "openai";


export const generateChatCompletion = async(
    req: Request,
    res: Response,
    next: NextFunction) => {
        const {message} = req.body;
        try {
            const user = await User.findById(res.locals.jwtData.id);

        if(!user){
            return res.status(401).json({message: "User not registered or Token Maulfunctioned"});
        }

        //grab chats of user
        const chats = user.chats.map(({role, content}) => ({
            role: role as 'user' | 'assistant' | 'system', 
            content
        }));
        
        chats.push({content: message, role:"user"});
        user.chats.push({content: message, role:"user"});

        //send all chats with new one to the to OpenAi API
        const openai = configureOpenAI();

        // get latest response

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        
        user.chats.push({
            role: "assistant",
            content: response.choices[0].message.content
        });

        await user.save();
        return res.status(200).json({ chats: user.chats});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: error.message});
        }
    };

export const sendChatsToUser = async (req: Request, res: Response,
    next: NextFunction) => {
        try{
            const user = await User.findById(res.locals.jwtData.id);
            if(!user){
                return res.status(401).send("User not registered or Token Maulfunctioned")
            }
            //console.log(user._id.toString(), res.locals.jwtData.id)
            if(user._id.toString() !== res.locals.jwtData.id){
                return res.status(401).send("Permision denied")
            }

            return res.status(200).json({message: "OK", chats: user.chats});
        } catch(error){
            console.log(error)
            return res.status(200).json({message: "ERROR", cause:error.message})
        }
    
};

export const deleteChats = async (req: Request, res: Response,
    next: NextFunction) => {
        try{
            const user = await User.findById(res.locals.jwtData.id);
            if(!user){
                return res.status(401).send("User not registered or Token Maulfunctioned")
            }
            //console.log(user._id.toString(), res.locals.jwtData.id)
            if(user._id.toString() !== res.locals.jwtData.id){
                return res.status(401).send("Permision denied")
            }
            //@ts-ignore
            user.chats = [];
            await user.save();

            return res.status(200).json({message: "OK"});
        } catch(error){
            console.log(error)
            return res.status(200).json({message: "ERROR", cause:error.message})
        }
    
};