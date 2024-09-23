import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Avatar, Box, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from '@mui/material/colors';
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io"; 
import { sendChatRequest, getUserChats } from "../helpers/api-communicators";
import { toast } from "react-hot-toast";
import { deleteUserChats } from "../helpers/api-communicators";
import { useNavigate } from "react-router-dom";

type Messages = {
    id?: string;
    role: "user" | "assistant" | "system";
    content: string;
    _id?: string;
};


const staticChats = [
    {
      role: "user",
      content: "Hello, can you help me with a question?"
    },
    {
      role: "assistant",
      content: "Of course! What would you like to ask?"
    },
    {
      role: "user",
      content: "What is the capital of France?"
    },
    {
      role: "assistant",
      content: "The capital of France is Paris."
    },
    {
      role: "user",
      content: "Can you tell me about the weather today?"
    },
    {
      role: "assistant",
      content: "I'm sorry, I currently do not have access to real-time data. Please check a weather app for the most accurate information."
    },
    {
      role: "user",
      content: "How do I create a JavaScript array?"
    },
    {
      role: "assistant",
      content: "You can create a JavaScript array like this: `let myArray = [1, 2, 3];`."
    },
    {
      role: "user",
      content: "Thank you!"
    },
    {
      role: "assistant",
      content: "You're welcome! Feel free to ask if you have more questions."
    }
  ];
  

const Chat = () => {
    const navigate = useNavigate();
    const inputRef  = useRef<HTMLInputElement | null>(null);
    const auth = useAuth();
    const [chatMessages, setChatMessages] = useState<Messages[]>([])

    useEffect(() => {
        console.log("Chat messages updated:", chatMessages);
      }, [chatMessages]);
    
    const handleSend = async () => {
        const content = inputRef.current?.value as string;

        if(content.trim() === ""){
            return; // Do not send empty messages
        }

        if (inputRef && inputRef.current){
            inputRef.current.value = "";
        }

        // Add the new message to the chat
        const newMessage: Messages = {role: "user", content};
        console.log('added new chat')
        setChatMessages((prev) => [...prev, newMessage]);
        
    
        try{
            //Wait for response from API
            const chatData = await sendChatRequest(content);
            setChatMessages([...chatData.chats]);
            console.log(chatMessages);
        } catch (error){
            console.log("Error fetching chat response",error);
        }
    };

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            toast.loading("Loading messages...", {id: "loading"});
            getUserChats().then((data) => {
                setChatMessages([...data.chats]);
                toast.success("Successfully loaded chats", {id: "loading"});
            }).catch((error) => {
                console.log("Error fetching chat response", error);
                toast.error("Loading Failed", {id: "loading"});
            });
        }
    }, [auth]);

    useEffect(() => {
        if(!auth?.user){
            return navigate("/login");
        }
    }, [auth]);

    const handleClearChat = async() => {
        try {
            toast.loading("Clearing messages...", {id: "clearing"});
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Successfully cleared chats", {id: "clearing"});
        } catch (error) {
            console.log("Error clearing chat", error);
            toast.error("Clearing Failed", {id: "clearing"});
        }
    };

    return (
        <Box
        sx = {{
            display: "flex",
            flex: 1,
            wifth: "100%",
            height: "100%",
            mt: 3,
            gap: 3,
        }}
        >
            <Box sx = {{display: {md: "flex", xs: "none", sm: "none"}, flex: 0.2, flexDirection: 'column' }}>
                <Box sx = {{
                    display: "flex",
                    width: "100%",
                    height: "60vh",
                    bgcolor: "rgb(17, 29, 39)",
                    borderRadius: 5,
                    flexDirection: "column",
                    mx: 3,
                }}>
                    <Avatar sx = {{
                        mx: "auto",
                        my: 2,
                        bgcolor: "white",
                        color: "black",
                        fontWeight: 700,
                    }}>
                        { auth?.user?.name[0] }
                    </Avatar>
                    <Typography sx = {{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 0}}>
                        You are talking to Dinakar's Chatbot
                    </Typography>
                    <Typography sx = {{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 2}}>
                        You can ask questions related to Knowledge, Business, Advics, Education etc. 
                        Please do not share personal information.
                    </Typography>
                    <Button
                        onClick = {handleClearChat} 
                        sx = {{
                        width: "200px",
                        my: "auto",
                        color: "white",
                        fontWeight: "700",
                        borderRadius: 3,
                        mx: "auto",
                        bgcolor: red[300],
                        ":hover": {
                            bgcolor: red.A400,
                        },
                    }}>
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            <Box sx = {{ display: "flex", flex: {md: 0.8, xs: 1, sm: 1}, flexDirection: 'column', px: 3}}>
                <Typography sx = {{
                    mx: "auto", fontSize: "40px", color: "white", mb: 2, fontWeight: "600",}}>
                        Model - GPT 3.5 Turbo
                    </Typography>
                    <Box sx = {{
                        width: "100%",
                        height: "60vh",
                        borderRadius: 3,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        scrollBehavior: "smooth",
                        overflowX: "hidden",
                        overflowY: "auto",
                    }}>
                        {chatMessages.map((chat, index) => (
                            //@ts-ignore
                            <ChatItem content = {chat.content} role = {chat.role} key={index}/>
                        ))}
                    </Box>
                    <div
                    style = {{
                        width: "100%",
                        padding: "20px",
                        borderRadius: 8,
                        backgroundColor: "rgb(17, 27, 39)",
                        display: "flex",
                        margin: "auto",
                    }}>
                        <input type="text" ref = {inputRef}
                        style = {{
                            width: '100%',
                            backgroundColor: 'transparent',
                            padding: "10px",
                            border: "none",
                            outline: "none",
                            color: "white",
                            fontSize: "20px",
                    }} />
                    <IconButton onClick ={handleSend} sx = {{ml: "auto", color:"white"}}>
                        <IoMdSend/>
                    </IconButton>
                    </div>
            </Box>
        </Box>
    );
};

export default Chat;