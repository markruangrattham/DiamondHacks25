import Tesseract from "tesseract.js"

export async function extractTextFromImage(imagePath: string): Promise<string> {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      "eng", // language
      { logger: (m) => console.log(m) }, // optional logger
    )

    return result.data.text
  } catch (error) {
    console.error("Error extracting text from image:", error)
    throw error
  }
}

