import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateInvoiceDraft = async (prompt: string, businessContext: string) => {
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are an expert financial assistant for InvoiceAI. 
    Transform the user's rough notes into a structured JSON invoice.
    
    Context:
    Business: ${businessContext}
    
    Output JSON format:
    {
      "invoiceNumber": "INV-XXXX",
      "items": [{ "description": string, "quantity": number, "unitPrice": number, "total": number }],
      "subtotal": number,
      "tax": number,
      "total": number,
      "notes": string
    }
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json"
    }
  });

  const text = response.text;
  if (!text) return null;
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    // Fallback: extract JSON from markdown if it returned markdown
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  }
};
