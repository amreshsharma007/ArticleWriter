// config.js
module.exports = {
  trends: {
    geo: "IN",
    maxTopics: 5,
  },
  llms: {
    defaultModel: "local",  // options: local | gemini | openai
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-2.5-flash",
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
    },
    local: {
      // model: "phi4-mini",   // ⬅⬅ NEW MODEL ADDED HERE
      // Other local models you can switch to:
      model: "phi3",
      // model: "llama3",
      // model: "mistral",
    }
  }
};
