import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export interface Flashcard {
  id: string
  front: string
  back: string
  type: "qa" | "fill-in-blank" | "definition"
  difficulty: "easy" | "medium" | "hard"
}

export async function generateFlashcards(content: string, title: string, subject?: string): Promise<Flashcard[]> {
  try {
    // Truncate content if it's too long
    const truncatedContent = content.length > 15000 ? content.substring(0, 15000) + "..." : content

    const prompt = `
      You are an expert educator and study material creator. Create a set of flashcards from the following lecture material.
      
      Title: ${title}
      ${subject ? `Subject: ${subject}` : ""}
      
      Content:
      ${truncatedContent}
      
      Create a diverse set of 10-15 flashcards that cover the key concepts, facts, definitions, and relationships in the material.
      
      Use a mix of these formats:
      1. Question and Answer (Q&A)
      2. Fill-in-the-blank
      3. Definition
      
      For each flashcard, assign a difficulty level (easy, medium, hard) based on the complexity of the concept.
      
      Format your response as a JSON array of flashcard objects with these properties:
      - id: a unique string identifier
      - front: the question/prompt side of the flashcard
      - back: the answer side of the flashcard
      - type: one of "qa", "fill-in-blank", or "definition"
      - difficulty: one of "easy", "medium", or "hard"
      
      Only return the JSON array, no other text.
    `

    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt,
    })

    // Parse the JSON response
    try {
      const flashcards = JSON.parse(text) as Flashcard[]
      return flashcards
    } catch (parseError) {
      console.error("Error parsing flashcards JSON:", parseError)
      return []
    }
  } catch (error) {
    console.error("Error generating flashcards:", error)
    throw error
  }
}

