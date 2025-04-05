"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, BookOpen, Clock, Star, Trash2 } from "lucide-react"

interface FlashcardSet {
  id: string
  title: string
  subject?: string
  createdAt: string
  cardCount: number
  lastStudied?: string
}

// Mock data for demonstration purposes
const mockFlashcardSets: FlashcardSet[] = [
  {
    id: "1",
    title: "Biology 101: Cell Structure",
    subject: "Biology",
    createdAt: "2025-04-01T12:00:00Z",
    cardCount: 15,
    lastStudied: "2025-04-04T15:30:00Z",
  },
  {
    id: "2",
    title: "World History: Ancient Civilizations",
    subject: "History",
    createdAt: "2025-03-28T09:15:00Z",
    cardCount: 22,
    lastStudied: "2025-04-03T10:45:00Z",
  },
  {
    id: "3",
    title: "Chemistry: Periodic Table Elements",
    subject: "Chemistry",
    createdAt: "2025-03-25T14:20:00Z",
    cardCount: 30,
    lastStudied: "2025-04-02T16:10:00Z",
  },
  {
    id: "4",
    title: "Physics: Laws of Motion",
    subject: "Physics",
    createdAt: "2025-03-20T11:30:00Z",
    cardCount: 12,
    lastStudied: "2025-03-30T13:25:00Z",
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the user's flashcard sets from the API
    const fetchFlashcardSets = async () => {
      try {
        const response = await fetch("/api/flashcards")

        if (response.ok) {
          const data = await response.json()
          setFlashcardSets(data)
        } else {
          // Fallback to mock data for demo purposes
          console.warn("Could not fetch flashcard sets, using mock data")
          setFlashcardSets(mockFlashcardSets)
        }
      } catch (error) {
        console.error("Error fetching flashcard sets:", error)
        // Fallback to mock data
        setFlashcardSets(mockFlashcardSets)
      } finally {
        setLoading(false)
      }
    }

    fetchFlashcardSets()
  }, [])

  const filteredSets = flashcardSets.filter(
    (set) =>
      set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (set.subject && set.subject.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const recentSets = [...flashcardSets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  const recentlyStudied = [...flashcardSets]
    .filter((set) => set.lastStudied)
    .sort((a, b) => new Date(b.lastStudied!).getTime() - new Date(a.lastStudied!).getTime())
    .slice(0, 3)

  return (
    <div className="container max-w-6xl py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Flashcards</h1>
          <p className="text-gray-500">Manage and study your flashcard sets</p>
        </div>
        <Link href="/upload">
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create New Set
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sets</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flashcardSets.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flashcardSets.reduce((total, set) => total + set.cardCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Studied</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentlyStudied.length > 0 ? formatDate(recentlyStudied[0].lastStudied!) : "Never"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentSets.map((set) => (
            <Link key={set.id} href={`/flashcards/${set.id}`}>
              <Card className="h-full hover:bg-gray-50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{set.title}</CardTitle>
                  <CardDescription>{set.subject}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500">{set.cardCount} cards</p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-gray-500">Created {formatDate(set.createdAt)}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold">All Flashcard Sets</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search sets..." className="pl-8" />
            <Input
              placeholder="Search sets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="recent">Recently Created</TabsTrigger>
            <TabsTrigger value="studied">Recently Studied</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {loading ? (
              <div className="text-center py-8">Loading flashcard sets...</div>
            ) : filteredSets.length === 0 ? (
              <div className="text-center py-8">
                {searchTerm ? "No flashcard sets match your search" : "You haven't created any flashcard sets yet"}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredSets.map((set) => (
                  <Card key={set.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="flex-grow p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{set.title}</h3>
                            {set.subject && <p className="text-sm text-gray-500">{set.subject}</p>}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{set.cardCount} cards</span>
                            <span>Created {formatDate(set.createdAt)}</span>
                            {set.lastStudied && <span>Last studied {formatDate(set.lastStudied)}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l">
                        <Link href={`/flashcards/${set.id}`} className="flex-1">
                          <Button variant="ghost" className="w-full h-full rounded-none">
                            Study
                          </Button>
                        </Link>
                        <Button variant="ghost" className="flex-1 text-red-500 rounded-none">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-4">
            <div className="grid gap-4">
              {recentSets.map((set) => (
                <Card key={set.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-grow p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{set.title}</h3>
                          {set.subject && <p className="text-sm text-gray-500">{set.subject}</p>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{set.cardCount} cards</span>
                          <span>Created {formatDate(set.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l">
                      <Link href={`/flashcards/${set.id}`} className="flex-1">
                        <Button variant="ghost" className="w-full h-full rounded-none">
                          Study
                        </Button>
                      </Link>
                      <Button variant="ghost" className="flex-1 text-red-500 rounded-none">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="studied" className="mt-4">
            <div className="grid gap-4">
              {recentlyStudied.map((set) => (
                <Card key={set.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-grow p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{set.title}</h3>
                          {set.subject && <p className="text-sm text-gray-500">{set.subject}</p>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{set.cardCount} cards</span>
                          <span>Last studied {formatDate(set.lastStudied!)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l">
                      <Link href={`/flashcards/${set.id}`} className="flex-1">
                        <Button variant="ghost" className="w-full h-full rounded-none">
                          Study
                        </Button>
                      </Link>
                      <Button variant="ghost" className="flex-1 text-red-500 rounded-none">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

