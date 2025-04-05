"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Eye, EyeOff } from "lucide-react"
import type { Flashcard } from "@/lib/flashcard-generator"
import { cn } from "@/lib/utils"

interface FlashcardListProps {
  flashcards: Flashcard[]
}

export function FlashcardList({ flashcards }: FlashcardListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [visibleAnswers, setVisibleAnswers] = useState<Set<string>>(new Set())

  const toggleAnswerVisibility = (id: string) => {
    const newVisibleAnswers = new Set(visibleAnswers)
    if (newVisibleAnswers.has(id)) {
      newVisibleAnswers.delete(id)
    } else {
      newVisibleAnswers.add(id)
    }
    setVisibleAnswers(newVisibleAnswers)
  }

  const filteredFlashcards = flashcards.filter((card) => {
    const matchesSearch =
      card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.back.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || card.type === filterType
    const matchesDifficulty = filterDifficulty === "all" || card.difficulty === filterDifficulty

    return matchesSearch && matchesType && matchesDifficulty
  })

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search flashcards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="qa">Q&A</SelectItem>
              <SelectItem value="fill-in-blank">Fill in blank</SelectItem>
              <SelectItem value="definition">Definition</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFlashcards.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No flashcards match your filters</p>
        ) : (
          filteredFlashcards.map((card) => (
            <Card key={card.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          getDifficultyColor(card.difficulty),
                        )}
                      >
                        {card.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        {getTypeLabel(card.type)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Front:</h3>
                    <p className="mt-1">{card.front}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Back:</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAnswerVisibility(card.id)}
                        className="h-8 px-2"
                      >
                        {visibleAnswers.has(card.id) ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-1" />
                            Hide Answer
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            Show Answer
                          </>
                        )}
                      </Button>
                    </div>
                    {visibleAnswers.has(card.id) && <p className="mt-1">{card.back}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

