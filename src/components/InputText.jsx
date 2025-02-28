import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, PaperclipIcon, MicIcon, SmileIcon } from 'lucide-react';

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      addMessage({
        user: localStorage.getItem('user'),
        message,
        avatar: localStorage.getItem('avatar'),
        timestamp: new Date().toISOString()
      });
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, would implement actual recording functionality
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white shadow-lg">
      <div className="flex items-center gap-3 max-w-6xl mx-auto">
        {/* Attachment button */}
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all focus:outline-none">
          <PaperclipIcon size={20} />
        </button>
        
        {/* Input field */}
        <div className="flex-1 relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full px-4 py-3 bg-transparent rounded-2xl focus:outline-none"
          />
          
          {/* Emoji button */}
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-all focus:outline-none">
            <SmileIcon size={18} />
          </button>
        </div>
        
        {/* Voice recording button */}
        <button 
          onClick={toggleRecording}
          className={`p-3 rounded-full focus:outline-none transition-all ${
            isRecording 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <MicIcon size={18} />
        </button>
        
        {/* Send button */}
        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
            message.trim() 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <SendIcon size={18} />
        </button>
      </div>
      
      {/* Character counter - only shows when typing */}
      {message.length > 0 && (
        <div className="flex justify-end mt-1 px-4">
          <span className="text-xs text-gray-400">
            {message.length} / 1000
          </span>
        </div>
      )}
    </div>
  );
};

export default InputText;