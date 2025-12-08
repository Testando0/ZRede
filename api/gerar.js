// api/gerar.js
import OpenAI from "openai";

export default async function handler(req, res) {
    try {
        const { prompt } = req.body;

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const result = await client.images.generate({
            model: "gpt-image-1",
            prompt,
            size: "1024x1024"
        });

        const imageUrl = result.data[0].url;

        res.status(200).json({ image: imageUrl });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erro ao gerar imagem" });
    }
}
