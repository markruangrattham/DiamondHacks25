"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlashcardViewer } from "@/components/flashcard-viewer"
import { FlashcardList } from "@/components/flashcard-list"
import { SpacedRepetitionSettings } from "@/components/spaced-repetition-settings"
import { Loader2, ArrowLeft, Save, Download } from "lucide-react"
import type { Flashcard } from "@/lib/flashcard-generator"

interface FlashcardSet {
  id: string
  title: string
  subject?: string
  createdAt: string
  flashcards: Flashcard[]
}

// Mock data for demonstration purposes
const mockFlashcardSet: FlashcardSet = {
  id: "mock-id",
  title: "Biology 101: Cell Structure",
  subject: "Biology",
  createdAt: new Date().toISOString(),
  flashcards: [
    {
      id: "1",
      front: "What is the powerhouse of the cell?",
      back: "Mitochondria",
      type: "qa",
      difficulty: "easy",
    },
    {
      id: "2",
      front: "The ________ is responsible for protein synthesis in the cell.",
      back: "ribosome",
      type: "fill-in-blank",
      difficulty: "medium",
    },
    {
      id: "3",
      front: "Define Endoplasmic Reticulum (ER):",
      back: "A network of membranous tubules within the cytoplasm of a eukaryotic cell, continuous with the nuclear membrane. It occurs in two forms: rough (with ribosomes) and smooth (without ribosomes).",
      type: "definition",
      difficulty: "hard",
    },
    {
      id: "4",
      front: "What is the function of the cell membrane?",
      back: "The cell membrane regulates what enters and exits the cell, provides protection and structure, and helps the cell maintain homeostasis. It's selectively permeable, allowing some substances to pass through while blocking others.",
      type: "qa",
      difficulty: "medium",
    },
    {
      id: "5",
      front: "Lysosomes contain ________ that break down waste materials and cellular debris.",
      back: "digestive enzymes",
      type: "fill-in-blank",
      difficulty: "medium",
    },
  ],
}

export default function FlashcardSetPage() {
  const params = useParams()
  const router = useRouter()
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("study")

  useEffect(() => {
    // In a real app, fetch the flashcard set from your API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setFlashcardSet(mockFlashcardSet)
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!flashcardSet) {
    return (
      <div className="container py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Flashcard Set Not Found</h1>
        <Button onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold mt-2">{flashcardSet.title}</h1>
          {flashcardSet.subject && <p className="text-gray-500">{flashcardSet.subject}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="mt-4">
          <FlashcardViewer flashcards={flashcardSet.flashcards} />
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <FlashcardList flashcards={flashcardSet.flashcards} />
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <SpacedRepetitionSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

