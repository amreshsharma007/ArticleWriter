// app.js
import fs from "fs";
import minimist from "minimist";
import { getTrendingTopics } from "./trends.js";
import { generateArticle } from "./llm.js";

// Strict Gemini-safe prompt templates
function articlePrompt(topic) {
  return `
Write a 300-word blog article on the topic: "${topic}".

STRICT RULES:
- Start directly with the article content.
- Do NOT add any introduction like “Here is the article” or “Below is”.
- Do NOT add explanations, apologies, or comments.
- Do NOT add disclaimers, warnings, or notes.
- Do NOT add headings or subheadings unless I explicitly request them.
- Do NOT use markdown formatting (#, *, _, ~, or ---).
- Do NOT wrap the text in quotes.
- Do NOT add extra lines before or after the article.
- Return ONLY the article content. Nothing else.
`;
}

function improvePrompt(article) {
  return `
Improve the following article for clarity, grammar, readability, and flow.

STRICT RULES:
- Return ONLY the improved article text.
- No introductions (“Here is the improved version” etc.).
- No explanations or comments.
- No markdown formatting (#, *, _, -, —).
- No disclaimers or notes.
- No extra lines before or after the article.
- Do NOT add titles or headings.
- Keep the same structure and meaning as the original.

ARTICLE:
${article}
`;
}

function sanitize(text) {
  return text
    .replace(/Here[^:]*:/gi, "")
    .replace(/Below[^:]*:/gi, "")
    .replace(/---/g, "")
    .replace(/\*\(.+\)\*/g, "")
    .replace(/^\s+|\s+$/g, "")
    .trim();
}

async function main() {
  const args = minimist(process.argv.slice(2));
  const provider = args.llm || "local";

  console.log(`🧠 Using LLM Provider: ${provider}`);

  console.log("📈 Fetching Google Trends...");
  const topics = await getTrendingTopics();
  const topic = topics[0];

  console.log(`🔥 Latest Trend: ${topic}`);

  // 1. Generate first draft
  console.log("✍️ Creating draft...");
  let article = await generateArticle(articlePrompt(topic), provider);
  article = sanitize(article);

  // 2. Improve the article
  console.log("🔧 Improving article...");
  let improved = await generateArticle(improvePrompt(article), provider);
  improved = sanitize(improved);

  // 3. Save
  const filename = `article_${Date.now()}.txt`;
  fs.writeFileSync(filename, improved);

  console.log(`📄 Article saved: ${filename}`);
}

main();
