import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Mic, MicMute, Clipboard } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

const SpeechToText = () => {
  const [status, setStatus] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();

      // Set properties inside useEffect
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = language;

      // Event listeners
      recog.onresult = (event) => {
        const results = event.results;
        const current = results[results.length - 1];
        if (current.isFinal) {
          setTranscript(prev => prev + ' ' + current[0].transcript);
        }
      };

      recog.onerror = (event) => {
        console.error('Recognition error:', event.error);
        setError(`Error: ${event.error}`);
        setStatus('idle');
      };

      recog.onend = () => {
        if (status === 'recording') {
          setError('Recording stopped unexpectedly');
        }
        setStatus('idle');
      };

      setRecognition(recog);

      // Cleanup function
      return () => {
        recog.stop();
        recog.abort();
      };
    }
  }, [language]);

  const toggleRecording = async () => {
    try {
      if (status === 'recording') {
        setStatus('stopping');
        recognition?.stop();
      } else {
        setStatus('starting');
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setTranscript('');
        setError('');
        recognition?.start();
        setStatus('recording');
      }
    } catch (err) {
      setError(`Failed: ${err.message}`);
      setStatus('idle');
      recognition?.stop();
    }
  };

  useEffect(() => {
    return () => {
      recognition?.stop();
    };
  }, [recognition]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  if (!recognition) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 mb-8 max-w-4xl mx-auto text-red-600">
        Speech recognition is not supported in your browser.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">
        Speech to Text Converter
      </h3>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#E74C3C]"
            disabled={status === 'recording'}
          >
            <option value="en-US">English (United States)</option>
            <option value="hi-IN">Hindi (India)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="fr-FR">French (France)</option>
          </select>
        </div>

        <div className="flex items-end gap-4">
          <Button
            onClick={toggleRecording}
            disabled={status === 'starting' || status === 'stopping'}
            className={`flex items-center gap-2 ${
              status === 'recording' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-[#E74C3C] hover:bg-[#ff6b5b]'
            } text-white font-semibold py-2 px-6 rounded-lg transition-colors`}
          >
            {status === 'recording' ? (
              <MicMute className="text-lg" />
            ) : (
              <Mic className="text-lg" />
            )}
            {status === 'recording'
              ? 'Stop Recording'
              : status === 'starting'
                ? 'Initializing...'
                : 'Start Recording'}
          </Button>

          <Button
            onClick={copyToClipboard}
            disabled={!transcript}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Clipboard className="text-lg" />
            Copy
          </Button>

          {status === 'starting' && (
            <div className="ml-2 text-sm text-gray-500">
              <span className="animate-pulse">Initializing microphone...</span>
            </div>
          )}
        </div>
      </div>
      {status === 'recording' && transcript === '' && (
        <div className="text-center py-4 text-gray-500">
          <div className="animate-pulse flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#E74C3C] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#E74C3C] rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-[#E74C3C] rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="mt-2">Listening for speech...</p>
        </div>
      )}
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={6}
          value={transcript}
          readOnly
          className="w-full p-4 border rounded-lg bg-gray-50 font-mono text-gray-700"
          placeholder="Your speech will appear here..."
        />
      </Form.Group>

      <div className="mt-4 text-sm text-gray-500">
        <p>Supported languages: English, Hindi, Spanish, French</p>
        <p>Note: Requires microphone access and modern browser support</p>
      </div>
    </div>
  );
};

export default SpeechToText;