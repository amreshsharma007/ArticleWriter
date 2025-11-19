// llm.js
import axios from "axios";
import { execSync } from "child_process";
import config from "./config.js";

export async function generateArticle(text, provider) {
  provider = provider || config.llms.defaultModel;

  if (provider === "gemini") {
    const model = config.llms.gemini.model;
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text }]
          }
        ]
      },
      {
        headers: { "x-goog-api-key": config.llms.gemini.apiKey }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  }


  if (provider === "openai") {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: config.llms.openai.model,
        messages: [{ role: "user", content: text }],
        max_tokens: 500
      },
      { headers: { Authorization: `Bearer ${config.llms.openai.apiKey}` } }
    );

    return response.data.choices[0].message.content;
  }

  // LOCAL OLLAMA
  if (provider === "local") {
    const prompt = text.replace(/"/g, '\\"');
    const cmd = `ollama run ${config.llms.local.model} "${prompt}"`;
    return execSync(cmd).toString();
  }

  throw new Error("Invalid LLM provider selected");
}
