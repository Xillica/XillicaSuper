import React, { useEffect, useRef, useState } from "react";

function ConsoleTextAnimation() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['tomato', 'rebeccapurple', 'lightblue'];
  const textRef = useRef("");
  const words = ['Hello World.', 'Console Text', 'Made with Love.'];

  useEffect(() => {
    let timeout;
    let currentWordIndex = 0;

    const animateText = () => {
      let i = 0;
      timeout = setInterval(() => {
        textRef.current += words[currentWordIndex].charAt(i);
        i++;
        setText(textRef.current);
        if (i === words[currentWordIndex].length) {
          clearInterval(timeout);
          setTimeout(() => {
            timeout = setInterval(() => {
              textRef.current = textRef.current.slice(0, -1);
              setText(textRef.current);
              if (textRef.current === "") {
                clearInterval(timeout);
                currentWordIndex = (currentWordIndex + 1) % words.length;
                setColorIndex((prevColorIndex) =>
                  (prevColorIndex + 1) % colors.length
                );
                setTimeout(() => {
                  animateText();
                }, 1000);
              }
            }, 120);
          }, 1000);
        }
      }, 120);
    };

    animateText();

    return () => {
      clearInterval(timeout);
    };
  }, []);

  const [text, setText] = useState(""); // Use a separate state for rendering

  return (
    <div className="console-container">
      <span id="text" style={{ color: colors[colorIndex] }}>
        {text}
      </span>
    </div>
  );
}

export default ConsoleTextAnimation;
