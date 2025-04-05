import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { generateFlashcards } from "@/lib/flashcard-generator"

export async function POST(request: NextRequest) {
  try {
    const { content, title, subject, type } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Create a unique ID for this flashcard set
    const id = uuidv4()

    // Generate flashcards from the content
    const flashcards = await generateFlashcards(content, title, subject)

    // Save flashcards to database (simplified for this example)
    // In a real app, you would save to a database
    const flashcardSet = {
      id,
      title,
      subject,
      createdAt: new Date().toISOString(),
      flashcards,
    }

    // Return the ID of the created flashcard set
    return NextResponse.json({ id, success: true })
  } catch (error) {
    console.error("Error generating flashcards:", error)
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 })
  }
}

