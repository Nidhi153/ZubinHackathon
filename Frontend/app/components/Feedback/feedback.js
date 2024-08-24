import { Datepicker, FloatingLabel } from "flowbite-react";
import React, { useState } from 'react';

export default function Feedback({ userId }) {
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleNewFeedback = () => {
        setMessage('');
        setSubmitted(false);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("submit");
        const newFeedback = {
        creator: userId,
        messsage: e.target.message.value
    };
    const res = await fetch("#", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    const data = await res.json();
    console.log(data);
  };

  return (

    <div style={{ padding: '20px' }}>
        {!submitted ? 
            <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="10"
                cols="50"
                style={{ width: '100%', padding: '10px', borderRadius: '10px'}}
                placeholder="Message"
              />
            </div>
            <button
                type="submit"
                className={`text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${!message ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'}`}
                disabled={!message}
            >
                Submit
            </button>
          </form>
        :
        <div>
          <h2 style={{ marginBottom: '10px' }}>Thank you for your feedback, our staff will carefully review it.</h2>
          <button
            onClick={handleNewFeedback}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit Another Feedback
          </button>
        </div>
        
        }
    
      
    </div>
  );
}
