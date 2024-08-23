import React, { useState } from 'react';
import './global.module.scss';
export default function ChatBox() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Message..."
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        rows={2}
      />
      <button
        type="send message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Send
      </button>
    </form>
  );
}