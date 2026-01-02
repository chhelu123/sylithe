import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ texts }) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let i = loopNum % texts.length;
    let fullText = texts[i];

    if (isDeleting) {
      setTypingSpeed(30);
    } else {
      setTypingSpeed(80);
    }

    const handleTyping = () => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2500); 
        return;
      }
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        return;
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);

  }, [text, isDeleting, loopNum, typingSpeed, texts]);

  return (
    <div className="font-mono text-xl md:text-3xl leading-relaxed text-gray-100 font-semibold drop-shadow-md">
      <span className="text-sylitheGreen mr-3">//</span>
      {text}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block text-sylitheGreen ml-1"
      >
        _
      </motion.span>
    </div>
  );
};

export default TypewriterText;