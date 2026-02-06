
import { GoogleGenAI, Type } from "@google/genai";
import { TaskStep } from "../types";

// Helper to get a fresh AI instance using the current environment key
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getTaskBreakdown = async (task: string): Promise<TaskStep[]> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O usuário está procrastinando a tarefa: "${task}". 
      Gere 3 micro-passos "ridiculamente simples". 
      Regra de Ouro: Cada passo deve poder ser feito em menos de 30 segundos. 
      Ex: Se a tarefa é 'Estudar', o passo 1 é 'Apenas abrir o livro na página 1', não 'Ler um capítulo'.
      Foque na ação física inicial.
      Escolha ícones apropriados da biblioteca Material Symbols (ex: 'touch_app', 'visibility', 'edit', 'pan_tool').`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Título imperativo (ex: 'Abra o site')." },
              desc: { type: Type.STRING, description: "Explicação em uma frase curta." },
              icon: { type: Type.STRING, description: "Nome do ícone Material Symbols." },
            },
            required: ["title", "desc", "icon"],
          },
        },
      },
    });

    const stepsData = JSON.parse(response.text || "[]");
    return stepsData.map((step: any, index: number) => ({
      ...step,
      id: index + 1,
    }));
  } catch (error: any) {
    console.error("Erro ao gerar passos com Gemini:", error);
    
    // Check for specific key error to prompt re-selection if needed externally
    if (error?.message?.includes("Requested entity was not found")) {
      console.warn("API Key issue detected. User may need to re-select.");
    }

    return [
      { id: 1, title: 'Respire e foque', desc: 'Apenas sente-se e respire fundo por 5 segundos.', icon: 'self_improvement' },
      { id: 2, title: 'Prepare a ferramenta', desc: 'Abra o app, site ou pegue o objeto necessário.', icon: 'handyman' },
      { id: 3, title: 'O primeiro toque', desc: 'Faça a ação mais simples possível agora.', icon: 'touch_app' },
    ];
  }
};

export const getVictoryTitle = async (task: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O usuário venceu a procrastinação em: "${task}".
      Crie um título de conquista curto e heróico (máximo 3 palavras).
      O título DEVE ser diretamente relacionado ao que foi escrito acima.
      Seja criativo, engraçado ou épico.
      Ex: 'Lavar louça' -> 'Soberano da Cozinha'.
      Ex: 'Responder emails' -> 'Mestre da Resposta'.
      Retorne APENAS o texto, sem aspas, sem pontos finais.`,
    });
    return response.text?.trim().replace(/['".]/g, '') || "Inércia Vencida";
  } catch (error) {
    return "Vencedor da Inércia";
  }
};
