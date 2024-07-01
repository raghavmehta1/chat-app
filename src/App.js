import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('');

    const res = await axios.post('http://localhost:5000/generate', { prompt }, { responseType: 'text' });
    setResponse(res.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with AI</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
          />
          <button type="submit">Send</button>
        </form>
        <pre>{response}</pre>
      </header>
    </div>
  );
}

export default App;
