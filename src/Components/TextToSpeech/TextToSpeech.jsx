import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { VolumeUp, StopCircle } from 'react-bootstrap-icons';
import useSpeechSynthesis from '../../hooks/useSpeechSynthesis.jsx';
import { toast } from 'react-toastify';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const { voices, isSpeaking, populateVoices, speak } = useSpeechSynthesis();

  useEffect(() => {
    populateVoices();
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) {
      toast.error('Please enter text to convert to speech');
      return;
    }
    speak(text, selectedVoice || voices[0], rate, pitch);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">
        Text to Speech Converter
      </h3>

      <Form.Group className="mb-4">
        <Form.Control
          as="textarea"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#E74C3C] focus:border-transparent"
        />
      </Form.Group>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Voice
          </label>
          <select
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#E74C3C]"
            disabled={!voices.length}
          >
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pitch ({pitch})
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full accent-[#E74C3C]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speed ({rate})
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full accent-[#E74C3C]"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button
          onClick={handleSpeak}
          disabled={isSpeaking || !text.trim()}
          className="flex items-center gap-2 bg-[#E74C3C] hover:bg-[#ff6b5b] text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <VolumeUp className="text-lg" />
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </Button>

        <Button
          onClick={() => window.speechSynthesis.cancel()}
          disabled={!isSpeaking}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <StopCircle className="text-lg" />
          Stop
        </Button>
      </div>
    </div>
  );
};

export default TextToSpeech;