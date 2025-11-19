# 🚀 LLM Blog Auto-Writer

This project automatically:

1. Fetches **Google Trending Topics**
2. Generates a **300-word blog article** using:
   - **Gemini API**, or
   - **OpenAI API**, or
   - **Local LLM via Ollama**
3. Improves the article with strict formatting rules
4. Saves the final output into a **local `.txt` file**

Everything runs from a single Node.js script.

---

## ✨ Features

- Multi-LLM support:
  - `--llm=gemini`
  - `--llm=openai`
  - `--llm=local`
- Clean output:
  - No AI disclaimers  
  - No headings unless requested  
  - No markdown  
  - Pure article content only  
- Smart prompts optimized for Gemini/OpenAI  
- Saves article as `article_<timestamp>.txt`  
- Works on **Windows**, **Mac**, **Linux**

---

# 🖥️ Requirements

Install these on any machine:

### ✔ Node.js (v18 or above)
https://nodejs.org/

### ✔ Git (optional)
https://git-scm.com/

### ✔ Ollama (optional, for Local LLM)
https://ollama.com/download

Pull a local model (if using local mode):

```bash
ollama pull phi4-mini
# or
ollama pull phi3
# or
ollama pull llama3


📦 Installation
1️⃣ Clone the project
git clone https://your-repo-url.git
cd llm-blog-writer


(or simply copy this folder to another PC)

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here


If using only local LLM (Ollama), you can skip keys.

⚙️ Configuration

Edit config.js to select your default LLM:

llms: {
  defaultModel: "gemini",       // or "openai" or "local"

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.0-flash",
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini",
  },

  local: {
    model: "phi4-mini",         // Ollama model name
  }
}

▶️ Usage
✔ Use Gemini
node app.js --llm=gemini

✔ Use OpenAI
node app.js --llm=openai

✔ Use Local LLM (Ollama)
node app.js --llm=local

Output Example

A file like:

article_1731498849912.txt


is created in the project folder.

It contains only clean blog text, no AI fluff.

❗ Common Issues
⚠ Warning: "MODULE_TYPELESS_PACKAGE_JSON"

Fix by adding this in package.json:

{
  "type": "module"
}

⚠ Gemini Model Not Found

Use only valid Gemini models:

gemini-2.0-flash

gemini-2.5-flash

gemini-2.5-pro

🧠 How It Works

Script fetches latest Google Trend topics

Builds strict Gemini/OpenAI-optimized prompts

Ensures:

No disclaimers

No markdown

No meta text

Improves the output

Saves final clean text
