import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { generateFlashcards } from "@/lib/flashcard-generator"
import { kv } from "@vercel/kv"

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

    // Save flashcards to database
    // For this example, we'll use Vercel KV (or mock it if not available)
    const flashcardSet = {
      id,
      title,
      subject,
      createdAt: new Date().toISOString(),
      flashcards,
      cardCount: flashcards.length,
    }

    try {
      // Try to use Vercel KV if available
      if (typeof kv !== "undefined" && kv.set) {
        await kv.set(`flashcard:${id}`, JSON.stringify(flashcardSet))
      } else {
        // Mock storage for development
        console.log("KV storage not available, mocking storage")
        // In a real app, you would use a database here
        global.mockStorage = global.mockStorage || {}
        global.mockStorage[`flashcard:${id}`] = flashcardSet
      }
    } catch (storageError) {
      console.error("Error storing flashcard set:", storageError)
      // Continue even if storage fails - we'll return the generated flashcards
    }

    // Return the ID and the generated flashcards
    return NextResponse.json({
      id,
      success: true,
      flashcards,
    })
  } catch (error) {
    console.error("Error generating flashcards:", error)
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 })
  }
}

