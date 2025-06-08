import OpenAI from 'openai';

// OpenAI instance
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

/**
 * Generate a draft medical report based on a prompt
 * @param prompt - The user's prompt for generating the report
 * @returns Promise<string> - The generated medical report content
 */
export const generateDraft = async (prompt: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a medical assistant helping to create patient reports. Generate professional, detailed medical reports based on the given prompt. Format the response as HTML for rich text display."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        return response.choices[0]?.message?.content || 'Unable to generate draft.';
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error('Failed to generate draft using AI');
    }
};

/**
 * Summarize medical report content
 * @param content - The medical report content to summarize
 * @returns Promise<string> - The summarized content
 */
export const summarizeContent = async (content: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a medical assistant. Provide a concise summary of the medical report highlighting key findings, assessments, and plans. Format as HTML."
                },
                {
                    role: "user",
                    content: `Please summarize this medical report: ${content}`
                }
            ],
            max_tokens: 200,
            temperature: 0.5,
        });

        return response.choices[0]?.message?.content || 'Unable to summarize content.';
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error('Failed to summarize content using AI');
    }
};

// System prompts for different types of medical reports
export const MEDICAL_PROMPTS = {
    GENERAL: "You are a medical assistant helping to create patient reports. Generate professional, detailed medical reports based on the given prompt. Format the response as HTML for rich text display.",
    SUMMARY: "You are a medical assistant. Provide a concise summary of the medical report highlighting key findings, assessments, and plans. Format as HTML.",
    CARDIOLOGY: "You are a cardiology specialist assistant. Generate detailed cardiovascular assessment reports with focus on heart conditions, ECG findings, and cardiac recommendations. Format as HTML.",
    NEUROLOGY: "You are a neurology specialist assistant. Generate detailed neurological assessment reports with focus on brain and nervous system conditions. Format as HTML.",
    ORTHOPEDICS: "You are an orthopedic specialist assistant. Generate detailed musculoskeletal assessment reports with focus on bones, joints, and movement disorders. Format as HTML.",
    DERMATOLOGY: "You are a dermatology specialist assistant. Generate detailed skin assessment reports with focus on dermatological conditions and treatments. Format as HTML."
};

/**
 * Generate specialized medical report based on category
 * @param prompt - The user's prompt
 * @param category - The medical specialty category
 * @returns Promise<string> - The generated specialized report
 */
export const generateSpecializedDraft = async (prompt: string, category: keyof typeof MEDICAL_PROMPTS = 'GENERAL'): Promise<string> => {
    try {
        const systemPrompt = MEDICAL_PROMPTS[category] || MEDICAL_PROMPTS.GENERAL;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        return response.choices[0]?.message?.content || 'Unable to generate specialized draft.';
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error('Failed to generate specialized draft using AI');
    }
};
