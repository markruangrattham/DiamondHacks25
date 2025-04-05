"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/file-uploader"
import { Loader2, FileText, ImageIcon, Upload } from "lucide-react"

export default function UploadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [activeTab, setActiveTab] = useState("text")
  const [files, setFiles] = useState<File[]>([])

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text || !title) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text,
          title,
          subject,
          type: "text",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/flashcards/${data.id}`)
      } else {
        throw new Error("Failed to generate flashcards")
      }
    } catch (error) {
      console.error("Error generating flashcards:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0 || !title) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("subject", subject)
    formData.append("type", activeTab === "pdf" ? "pdf" : "image")

    files.forEach((file) => {
      formData.append("files", file)
    })

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/flashcards/${data.id}`)
      } else {
        throw new Error("Failed to upload files")
      }
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Upload Lecture Materials</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create New Flashcard Set</CardTitle>
          <CardDescription>Upload your lecture materials or paste text to generate flashcards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Biology 101 Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Input
                  id="subject"
                  placeholder="Biology"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="pdf" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDF
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-4">
                <form onSubmit={handleTextSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text">Paste your lecture notes or text</Label>
                      <Textarea
                        id="text"
                        placeholder="Paste your lecture notes here..."
                        className="min-h-[200px]"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Flashcards...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Generate Flashcards
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="pdf" className="mt-4">
                <form onSubmit={handleFileSubmit}>
                  <div className="space-y-4">
                    <FileUploader
                      accept=".pdf"
                      maxFiles={1}
                      maxSize={10 * 1024 * 1024} // 10MB
                      onFilesChange={setFiles}
                      label="Upload PDF file (Max 10MB)"
                    />
                    <Button type="submit" disabled={isLoading || files.length === 0} className="w-full">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing PDF...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Generate Flashcards
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="image" className="mt-4">
                <form onSubmit={handleFileSubmit}>
                  <div className="space-y-4">
                    <FileUploader
                      accept="image/*"
                      maxFiles={5}
                      maxSize={5 * 1024 * 1024} // 5MB per image
                      onFilesChange={setFiles}
                      label="Upload images of notes or slides (Max 5 images, 5MB each)"
                    />
                    <Button type="submit" disabled={isLoading || files.length === 0} className="w-full">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing Images...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Generate Flashcards
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <p className="text-sm text-gray-500">Your data is processed securely using AI</p>
        </CardFooter>
      </Card>
    </div>
  )
}

