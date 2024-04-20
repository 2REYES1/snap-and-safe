import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import * as fs from 'node:fs';

const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fs = require("fs");

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", safetySettings});

export default model;

// async function run() {
//   // For text-and-image input (multimodal), use the gemini-pro-vision model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", safetySettings});

//   const prompt = "What's different between these pictures?";

//   const imageParts = [
//     fileToGenerativePart("image1.png", "image/png"),
//     fileToGenerativePart("image2.jpeg", "image/jpeg"),
//   ];

//   const result = await model.generateContent([prompt, ...imageParts]);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();