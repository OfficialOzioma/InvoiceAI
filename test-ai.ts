import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();

async function test() {
  const url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
  console.log("Sending direct fetch to Gemini endpoint...");
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gemini-1.5-flash",
        messages: [{ role: "user", content: "test" }]
      })
    });
    
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("API Body:", text);
  } catch (e) {
    console.error(e);
  }
}

test();
