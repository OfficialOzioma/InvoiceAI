import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

let openaiInstance: OpenAI | null = null;

const getOpenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || "";
  if (!apiKey) {
    throw new Error("No API connection found. Please provide an API key in the secrets panel.");
  }

  if (!openaiInstance) {
    console.log("[AI] Initializing OpenAI Client with base URL:", process.env.AI_BASE_URL || "Using Gemini Endpoint");
    openaiInstance = new OpenAI({
      apiKey,
      baseURL: process.env.AI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
  }
  return openaiInstance;
};

export const generateInvoiceDraft = async (prompt: string, businessContext: string) => {
  const model = process.env.AI_MODEL || "gemini-1.5-flash"; // More stable default
  console.log(`[AI] Requesting extraction for: "${prompt.substring(0, 50)}..." using ${model}`);

  try {
    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { 
          role: 'system', 
          content: `You are a world-class financial assistant. 
          Extract invoice details from the user's text into a structured JSON object.
          
          Context:
          Business: ${businessContext}
          
          REQUIRED JSON STRUCTURE:
          {
            "invoiceNumber": "INV-2026-X",
            "clientName": "Client Name",
            "items": [{ "description": "Item name", "quantity": number, "unitPrice": number, "total": number }],
            "subtotal": number,
            "tax": number,
            "total": number,
            "notes": "Any extra details"
          }
          
          IMPORTANT: Respond ONLY with valid JSON. Do not use markdown blocks, just return raw JSON text.`
        },
        { role: 'user', content: prompt }
      ]
    }, {
      timeout: 25000 // 25 seconds
    });

    let content = response.choices[0].message.content;
    console.log(`[AI] Response Status: ${response.choices[0].finish_reason}`);
    
    if (!content) {
      throw new Error("The AI returned an empty response. Please try again with more details.");
    }

    // Strip markdown formatting if the model still generated it
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const parsed = JSON.parse(content);
      console.log("[AI] Successfully parsed JSON draft");
      return parsed;
    } catch (parseError) {
      console.error("[AI] JSON Parse Fail:", content);
      throw new Error("The AI returned invalid formatting. Try asking again more simply.");
    }
  } catch (e: any) {
    let errorMsg = e.message || "Unknown AI error";
    if (errorMsg.includes("400") || errorMsg.includes("status code")) {
        errorMsg = "Configuration Error: Invalid API key or model mismatch. Please verify your GEMINI_API_KEY in the platform's Secrets panel.";
    }
    console.error("[AI] Fatal Error:", errorMsg);
    throw new Error(errorMsg);
  }
};
