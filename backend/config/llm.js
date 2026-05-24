import dotenv from 'dotenv';
dotenv.config();

import { ChatMistralAI } from "@langchain/mistralai";

const llm = new ChatMistralAI({
   apiKey: process.env.MISTRAL_API_KEY,
   model: "mistral-small-latest",
   temperature: 0.7
});

export default llm;