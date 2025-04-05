"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react"
import type { Flashcard } from "@/lib/flashcard-generator"
import { cn } from "@/lib/utils"

interface FlashcardViewerProps {
  flashcards: Flashcard[]
}

export function FlashcardViewer({ flashcards }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set())

  const currentCard = flashcards[currentIndex]

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  const handleKnown = () => {
    const newKnownCards = new Set(knownCards)
    newKnownCards.add(currentCard.id)
    setKnownCards(newKnownCards)
    handleNext()
  }

  const handleUnknown = () => {
    const newKnownCards = new Set(knownCards)
    newKnownCards.delete(currentCard.id)
    setKnownCards(newKnownCards)
    handleNext()
  }

  const resetCards = () => {
    setCurrentIndex(0)
    setFlipped(false)
    setKnownCards(new Set())
  }

  const formatCardContent = (content: string, type: string) => {
    if (type === "fill-in-blank" && !flipped) {
      return content.replace(/______/g, "______")
    }
    return content
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "qa":
        return "Q&A"
      case "fill-in-blank":
        return "Fill in the blank"
      case "definition":
        return "Definition"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Card {currentIndex + 1} of {flashcards.length}
        </div>
        <div className="text-sm text-gray-500">
          {knownCards.size} known / {flashcards.length - knownCards.size} to learn
        </div>
      </div>

      <Card
        className={cn(
          "relative min-h-[300px] cursor-pointer transition-all duration-500 transform-gpu",
          flipped ? "rotate-y-180" : "",
        )}
        onClick={handleFlip}
      >
        <div className="absolute top-0 left-0 w-full h-full backface-hidden">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <div className="absolute top-4 right-4 flex gap-2">
              <span
                className={cn("px-2 py-1 rounded-full text-xs font-medium", getDifficultyColor(currentCard.difficulty))}
              >
                {currentCard.difficulty}
              </span>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                {getTypeLabel(currentCard.type)}
              </span>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium mb-4">{formatCardContent(currentCard.front, currentCard.type)}</p>
              <p className="text-sm text-gray-500 mt-4">Click to flip</p>
            </div>
          </CardContent>
        </div>

        <div className="absolute top-0 left-0 w-full h-full backface-hidden rotate-y-180">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <div className="text-center">
              <p className="text-lg font-medium mb-4">{currentCard.back}</p>
              <p className="text-sm text-gray-500 mt-4">Click to flip back</p>
            </div>
          </CardContent>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={resetCards} title="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="text-red-500" onClick={handleUnknown} title="Don't know">
            <ThumbsDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="text-green-500" onClick={handleKnown} title="Know it">
            <ThumbsUp className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .transform-gpu {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  )
}

