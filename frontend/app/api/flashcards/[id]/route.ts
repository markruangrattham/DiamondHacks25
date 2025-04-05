import { type NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Flashcard set ID is required" }, { status: 400 })
    }

    // Try to fetch from Vercel KV if available
    let flashcardSet

    try {
      if (typeof kv !== "undefined" && kv.get) {
        flashcardSet = await kv.get(`flashcard:${id}`)
      } else {
        // Mock storage for development
        console.log("KV storage not available, using mock storage")
        flashcardSet = global.mockStorage?.[`flashcard:${id}`]
      }
    } catch (storageError) {
      console.error("Error retrieving flashcard set:", storageError)
    }

    if (!flashcardSet) {
      // For demo purposes, return a mock flashcard set
      // In production, you would return a 404
      return NextResponse.json({
        id,
        title: "Sample Flashcard Set",
        subject: "Demo",
        createdAt: new Date().toISOString(),
        flashcards: [
          {
            id: "1",
            front: "What is the capital of France?",
            back: "Paris",
            type: "qa",
            difficulty: "easy",
          },
          {
            id: "2",
            front: "The process of photosynthesis converts ________ and water into glucose and oxygen.",
            back: "carbon dioxide",
            type: "fill-in-blank",
            difficulty: "medium",
          },
        ],
        cardCount: 2,
      })
    }

    return NextResponse.json(flashcardSet)
  } catch (error) {
    console.error("Error fetching flashcard set:", error)
    return NextResponse.json({ error: "Failed to fetch flashcard set" }, { status: 500 })
  }
}

