import { randomUUID } from 'crypto';
import mongoose from 'mongoose';

//Schema for chat
const chatSchema = new mongoose.Schema({
    id: { type: String, default: randomUUID()},
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
});

//Schema for user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    chats: [ chatSchema ],
});

//Export model
export default mongoose.model('User', userSchema);