import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCode(message: string) {
    if (message.includes("```")) {
        const block = message.split("```");
        return block;
    }
}

function isCodeBlock(str: string) {
    if(str.includes("=") || 
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
    ) {
        return true;
    }
    return false;
}

const ChatItem = ({content, role}:{content: string,
    role: 'user' | 'assistant' | 'system'}) => {
    
    const messageBlocks = extractCode(content);

    const auth = useAuth();

    return role == "assistant" ? (
        <Box sx = {{
            display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2}}
            >
                <Avatar sx = {{ml: 0}}>
                    <img src = 'OpenAI-logo.png' alt = 'OpenAI' width = {'30px'}/>
                </Avatar>
                <Box>
                   {!messageBlocks && (<Typography sx = {{fontSize: "20px"}}>
                          {content} </Typography>)}
                    {messageBlocks && 
                    messageBlocks.length > 1 && 
                    messageBlocks.map((block) => isCodeBlock(block) ? (
                        <SyntaxHighlighter language = "javascript" style = {coldarkCold}>
                            {block}
                        </SyntaxHighlighter>
                    ) : (
                        <Typography sx = {{fontSize: "20px"}}>
                            {block}
                        </Typography>
                    ) )}
                </Box>
                </Box>
    ) : (
    <Box sx = {{
        display: "flex", p: 2, bgcolor: "#004d56", gap: 2}}
        >
            <Avatar sx = {{ml: 0, bgcolor: "black", color: 'white'}}>
                {auth?.user?.name[0]}
            </Avatar>
            <Box>
                <Typography fontSize={"20px"}>{content}</Typography>
            </Box>
        </Box>
    );
};

export default ChatItem;