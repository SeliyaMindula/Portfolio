import { useEffect, useState } from "react";

export function useTypewriter(words, typingSpeed = 100, pauseDuration = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));

          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));

          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, pauseDuration]);

  return text;
}
