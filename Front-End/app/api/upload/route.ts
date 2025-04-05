import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { extractTextFromPdf } from "@/lib/pdf-parser"
import { extractTextFromImage } from "@/lib/ocr"
import { generateFlashcards } from "@/lib/flashcard-generator"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const subject = formData.get("subject") as string
    const type = formData.get("type") as string
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Create a unique ID for this flashcard set
    const id = uuidv4()

    // Process files based on type
    let extractedText = ""

    for (const file of files) {
      // Save file temporarily
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const tempPath = join("/tmp", file.name)
      await writeFile(tempPath, buffer)

      // Extract text based on file type
      if (type === "pdf") {
        const pdfText = await extractTextFromPdf(tempPath)
        extractedText += pdfText + "\n\n"
      } else if (type === "image") {
        const imageText = await extractTextFromImage(tempPath)
        extractedText += imageText + "\n\n"
      }
    }

    // Generate flashcards from the extracted text
    const flashcards = await generateFlashcards(extractedText, title, subject)

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
    console.error("Error processing upload:", error)
    return NextResponse.json({ error: "Failed to process files" }, { status: 500 })
  }
}

