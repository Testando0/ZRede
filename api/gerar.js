import OpenAI from "openai";

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Método não permitido" });
        }

        const { prompt } = req.body;

        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({ error: "Prompt vazio" });
        }

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const result = await client.images.generate({
            model: "gpt-image-1",
            prompt,
            size: "1024x1024"
        });

        const url = result.data[0]?.url;

        if (!url) {
            return res.status(500).json({
                error: "A API da OpenAI não retornou nenhuma imagem",
                raw: result
            });
        }

        return res.status(200).json({ image: url });

    } catch (e) {
        console.error("Erro do servidor:", e);

        return res.status(500).json({
            error: "Erro interno no servidor",
            message: e.message,
            stack: e.stack
        });
    }
            }
