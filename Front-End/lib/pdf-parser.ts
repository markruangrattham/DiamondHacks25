import * as pdfjs from "pdfjs-dist"

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export async function extractTextFromPdf(filePath: string): Promise<string> {
  try {
    // Load the PDF file
    const data = new Uint8Array(await require("fs").promises.readFile(filePath))
    const loadingTask = pdfjs.getDocument({ data })
    const pdf = await loadingTask.promise

    let extractedText = ""

    // Iterate through each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const strings = content.items.map((item: any) => item.str)
      extractedText += strings.join(" ") + "\n"
    }

    return extractedText
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    throw error
  }
}

