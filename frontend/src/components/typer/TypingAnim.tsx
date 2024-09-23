import React from "react";
import { TypeAnimation } from 'react-type-animation';

export const TypingAnim = () => {
    return (
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Chat with my AI-powered assistant',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Built with Open AI',
                2000,
                'Like your own personal Chat-GPT',
                1050,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '60px',
                        display: 'inline-block',
                        color: "white",
                        textShadow: "1px 1px 20px #000", }}
              repeat={Infinity}
            />
        );
};