import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { Language } from '../constants/translations'; // Updated import path

// IMPORTANT: The API key MUST be available as process.env.API_KEY in the execution environment.
const API_KEY = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn(
    'Gemini API Key (process.env.API_KEY) is not defined. API calls will fail if not set.'
  );
}

const GEMINI_MODEL = 'gemini-2.5-flash-preview-04-17';

export async function refineUserPrompt(
  originalPrompt: string,
  userLanguage: Language
): Promise<string> {
  if (!API_KEY || !ai) {
    const errorMsg =
      userLanguage === 'zh-TW'
        ? 'Gemini API 金鑰未設定。請確保 process.env.API_KEY 已在您的環境中設定。沒有它，應用程式無法運作。'
        : 'Gemini API Key is not configured. Please ensure process.env.API_KEY is set in your environment. The application cannot function without it.';
    return Promise.reject(new Error(errorMsg));
  }

  if (!originalPrompt || !originalPrompt.trim()) {
    const errorMsg =
      userLanguage === 'zh-TW' ? '請輸入有效的提示詞。' : 'Please enter a valid prompt.';
    return Promise.reject(new Error(errorMsg));
  }

  const targetLanguageInstruction =
    userLanguage === 'zh-TW'
      ? '請以繁體中文提供優化後的提示詞。確保語氣和措辭對繁體中文使用者來說自然。'
      : 'Please provide the refined prompt in English.';

  const instructionToGemini = `
You are an expert Prompt Engineering Assistant. Your sole task is to take a user's initial AI prompt idea and transform it into a significantly more effective, detailed, and well-structured prompt.
The goal is to help the user craft a "power prompt" that will yield better results from another AI model.

${targetLanguageInstruction}

When refining the prompt, consider and incorporate these core principles if applicable and not already well-defined by the user:
1.  **Persona:** If relevant, define the role the AI should adopt (e.g., "You are a witty marketing copywriter," "You are a helpful travel guide specializing in Italy").
2.  **Task:** Specify exactly what the AI needs to do (e.g., "Generate 5 creative taglines," "Write a three-day itinerary," "Summarize this document").
3.  **Context:** Provide all necessary background information, constraints, or examples the AI needs.
4.  **Format:** If a specific output structure is beneficial, indicate it (e.g., "in bullet points," "as a JSON object," "in a professional email format," "limit the response to 200 words").

The user's initial prompt idea is:
"${originalPrompt}"

CRITICAL INSTRUCTION: Your response MUST ONLY be the refined prompt itself, as plain text. Do NOT include any introductory phrases, explanations, or conversational text like "Here is the refined prompt:" or "I have enhanced your prompt to be:". Just output the refined prompt directly.
The refined prompt should be ready for direct copy-pasting for use with another AI.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: instructionToGemini,
    });

    const text = response.text;
    if (!text) {
      throw new Error(
        'Received an empty response from the Gemini API. The model might not have been able to process the request.'
      );
    }
    return text.trim();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    let errorMessage = 'Failed to refine prompt due to an API error.';
    if (userLanguage === 'zh-TW') {
      errorMessage = '由於 API 錯誤，強化提示詞失敗。';
    }

    if (error instanceof Error) {
      if (
        error.message.toLowerCase().includes('api key') ||
        error.message.toLowerCase().includes('permission denied')
      ) {
        errorMessage =
          userLanguage === 'zh-TW'
            ? 'Gemini API 設定似乎有問題（例如，無效的 API 金鑰或權限）。請檢查您的設定。'
            : 'There seems to be an issue with the Gemini API configuration (e.g., invalid API key or permissions). Please check your setup.';
      } else if (error.message.toLowerCase().includes('quota')) {
        errorMessage =
          userLanguage === 'zh-TW'
            ? 'API 配額已超過。請稍後再試或檢查您的 Gemini API 配額。'
            : 'API quota exceeded. Please try again later or check your Gemini API quota.';
      } else if (error.message.toLowerCase().includes('model not found')) {
        errorMessage =
          userLanguage === 'zh-TW'
            ? `指定的 Gemini 模型 (${GEMINI_MODEL}) 找不到。`
            : `The specified Gemini model (${GEMINI_MODEL}) could not be found.`;
      } else if (error.message.includes('Received an empty response')) {
        errorMessage =
          userLanguage === 'zh-TW'
            ? '從 Gemini API 收到了空的回應。模型可能無法處理該請求。'
            : 'Received an empty response from the Gemini API. The model might not have been able to process the request.';
      } else {
        errorMessage = `${userLanguage === 'zh-TW' ? '強化提示詞失敗：' : 'Failed to refine prompt: '} ${error.message}`;
      }
    }
    return Promise.reject(new Error(errorMessage));
  }
}
