import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AgentType } from "../types";

// Define the agents context globally for the AI
const AGENT_CONTEXT = `
1. **Agente de Autoconhecimento Profissional**: Descubra quem você é na sua carreira, identificando suas forças, valores e objetivos reais. Guia por reflexões e análises para decisões conscientes e alinhadas ao propósito.
2. **Agente Mentoria para Currículo e LinkedIn**: Apoio para criar e otimizar currículo e perfil do LinkedIn com IA. Revisa e sugere melhorias estratégicas para destacar experiência e competências para recrutadores.
3. **Up Entrevistas – Assistente de Preparação**: Assistente que ajuda a praticar respostas, entender competências exigidas e apresentar-se com confiança. Dicas personalizadas alinhadas à vaga desejada.
`;

export const generateCarouselContent = async (
  agentType: AgentType,
  customContext: string = ""
): Promise<any> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are a world-class Social Media Strategist and Copywriter for LinkedIn and Instagram. 
    Your goal is to create high-converting carousel content for AI Career Agents.
    
    Use "Mental Triggers" (Gatilhos Mentais) such as:
    - Authority (Autoridade)
    - Scarcity/Urgency (Escassez)
    - Social Proof (Prova Social)
    - Novelty (Novidade)
    - Pain/Pleasure (Dor e Prazer)
    
    The tone should be professional, inspiring, and direct. Portuguese Language (Brasil).
    
    Context of the Products:
    ${AGENT_CONTEXT}
  `;

  const prompt = `
    Create a 5-slide carousel content plan for: ${agentType}.
    ${customContext ? `Additional Context: ${customContext}` : ''}

    Structure:
    - Slide 1: Hook/Headline (High impact, stops the scroll).
    - Slide 2: Agitate the problem (Why the user struggles without this).
    - Slide 3: Introduce the Solution (The specific Agent selected).
    - Slide 4: Key Benefit/Transformation (What they get).
    - Slide 5: Call to Action (Strong command to use the agent).

    For each slide, suggest a visual keyword (English) for a background image (e.g., "office meeting", "stressed worker", "success handshake").
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      topic: { type: Type.STRING, description: "Short topic title for the carousel" },
      targetAudience: { type: Type.STRING, description: "Who this is for" },
      slides: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            subtitle: { type: Type.STRING, description: "Small text above headline" },
            headline: { type: Type.STRING, description: "Main big text" },
            body: { type: Type.STRING, description: "Supporting text, keep it punchy" },
            imageKeyword: { type: Type.STRING, description: "Keyword for background image search (one or two words)" },
            cta: { type: Type.STRING, description: "Only for the last slide" }
          },
          required: ["id", "subtitle", "headline", "body", "imageKeyword"]
        }
      }
    },
    required: ["topic", "targetAudience", "slides"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};