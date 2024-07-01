const express = require('express');
const Replicate = require('replicate');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  
  const input = {
    top_k: 50,
    top_p: 0.9,
    prompt,
    max_tokens: 512,
    min_tokens: 0,
    temperature: 0.2,
    system_prompt: "You are a helpful assistant.",
    stop_sequences: "",
    presence_penalty: 1.15,
    frequency_penalty: 0.2
  };

  for await (const event of replicate.stream("snowflake/snowflake-arctic-instruct", { input })) {
    res.write(event.toString());
  }

  res.end();
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
