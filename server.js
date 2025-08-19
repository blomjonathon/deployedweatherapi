// server.js
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
  res.send("✅ Weather Story API is running!");
});


app.post("/story", async (req, res) => {
  const { city, temp, weather } = req.body;

  try {
    const response = await client.responses.create({
      model: "gpt-5",
      input: `Write a fun one-sentence message about the weather in ${city}. It's currently ${temp}°F and ${weather}.`
    });

    res.json({ story: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
