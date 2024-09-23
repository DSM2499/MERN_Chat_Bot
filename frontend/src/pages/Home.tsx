import React from "react";
import { Box } from "@mui/material";
import { TypingAnim } from "../components/typer/TypingAnim";
import { Footer } from "../components/footer/Footer";

const Home = () => {
    return (
        <Box width={"100%"} height={"100%"}>
            <Box sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                mx: "auto",
                mt: 3.
            }}>
                <Box>
                    <TypingAnim/>
                </Box>
                <Box sx = {{
                    width: "100%",
                    display: "flex",
                    flexDirection: {md: "row", xs: "column"},
                    gap: 5,
                    my: 10,
                    mt: 3,
                }}>
                    <img src = "cool_robo.jpeg" alt = "DallE" style = {{
                        width: "200px",
                        margin: "auto"
                    }}/>
                    <img src = "OpenAI-logo.png" alt = "openai" className = "image-inverted rotate"
                    style = {{
                        width: "200px",
                        margin: "auto"
                    }}/>
                </Box>
                <Box sx = {{display: "flex", width: "100%", mx: "auto"}}>
                    <img src = "chat.png"
                    alt="chat"
                    style = {{
                        display: "flex",
                        margin: "auto",
                        width: "60%",
                        borderRadius: 20,
                        boxShadow: "-5px -5px 105px #64f3d5",
                        marginTop: 20,
                        marginBottom: 20
                    }}/>
                </Box>
            </Box>
            <Footer/>
        </Box>
    );
};

export default Home;