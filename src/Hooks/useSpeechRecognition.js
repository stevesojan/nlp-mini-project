import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  
  const recognition = typeof window !== 'undefined' 
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(prev => prev + ' ' + transcript);
    };

    recognition.onerror = (event) => {
      setError('Recognition Error: ' + event.error);
      stopListening();
    };

    return () => {
      recognition?.abort();
    };
  }, []);

  const startListening = (lang = 'en-US') => {
    if (!recognition) {
      setError('Speech recognition not supported');
      return;
    }
    
    recognition.lang = lang;
    setTranscript('');
    setError('');
    try {
      recognition.start();
      setIsListening(true);
    } catch (err) {
      setError('Error starting recognition: ' + err.message);
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    supported: !!recognition
  };
};

export default useSpeechRecognition;