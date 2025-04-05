import { type NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET(request: NextRequest) {
  try {
    // Try to fetch from Vercel KV if available
    let flashcardSets = []

    try {
      if (typeof kv !== "undefined" && kv.keys && kv.mget) {
        // Get all flashcard set keys
        const keys = await kv.keys("flashcard:*")

        if (keys.length > 0) {
          // Fetch all flashcard sets
          const values = await kv.mget(...keys)

          // Map keys to values
          flashcardSets = keys
            .map((key, index) => {
              const set = values[index]
              return set
            })
            .filter(Boolean)
        }
      } else {
        // Mock storage for development
        console.log("KV storage not available, using mock storage")
        if (global.mockStorage) {
          flashcardSets = Object.values(global.mockStorage)
        }
      }
    } catch (storageError) {
      console.error("Error retrieving flashcard sets:", storageError)
    }

    // If no flashcard sets found, return mock data for demo
    if (flashcardSets.length === 0) {
      return NextResponse.json([
        {
          id: "mock1",
          title: "Biology 101: Cell Structure",
          subject: "Biology",
          createdAt: new Date().toISOString(),
          cardCount: 15,
          lastStudied: new Date().toISOString(),
        },
        {
          id: "mock2",
          title: "World History: Ancient Civilizations",
          subject: "History",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          cardCount: 22,
          lastStudied: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ])
    }

    return NextResponse.json(flashcardSets)
  } catch (error) {
    console.error("Error fetching flashcard sets:", error)
    return NextResponse.json({ error: "Failed to fetch flashcard sets" }, { status: 500 })
  }
}

