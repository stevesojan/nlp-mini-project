import { useState, useEffect } from 'react';

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  const populateVoices = () => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices.filter(voice => voice.lang.includes('en') || voice.lang.includes('hi')));
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = populateVoices;
      populateVoices();
    }
  }, []);

  const speak = (text, voice, rate = 1, pitch = 1) => {
    if (!text || !voices.length) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setCurrentUtterance(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    voices,
    isSpeaking,
    populateVoices,
    speak,
    stopSpeaking
  };
};

export default useSpeechSynthesis;