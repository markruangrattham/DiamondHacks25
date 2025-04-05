import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Upload, Brain, Save } from "lucide-react"

export const metadata: Metadata = {
  title: "StudyFlash - AI-Powered Flashcard Generator",
  description: "Transform lecture materials into smart, spaced-repetition-ready flashcards using AI",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-5 w-5" />
            <span>StudyFlash</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Transform Lecture Materials into Smart Flashcards
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Upload your notes, PDFs, or images and let AI create effective study materials for you.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/upload">
                  <Button className="bg-primary hover:bg-primary/90">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/examples">
                  <Button variant="outline">View Examples</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">AI-Powered Learning</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Study Smarter, Not Harder
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI analyzes your lecture materials and automatically generates flashcards optimized for effective
                  learning.
                </p>
              </div>
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Upload className="h-8 w-8 text-primary" />
                    <div className="grid gap-1">
                      <CardTitle>Multiple Formats</CardTitle>
                      <CardDescription>Upload text, PDFs, or images of notes and slides</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Our system can process various types of lecture materials, extracting the key information for your
                      flashcards.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Brain className="h-8 w-8 text-primary" />
                    <div className="grid gap-1">
                      <CardTitle>Smart Formatting</CardTitle>
                      <CardDescription>Q&A, fill-in-the-blank, and definitions</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      AI generates various flashcard formats to help you learn and retain information more effectively.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Save className="h-8 w-8 text-primary" />
                    <div className="grid gap-1">
                      <CardTitle>Organize & Save</CardTitle>
                      <CardDescription>Keep your flashcards organized by course or topic</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Create collections for different subjects and access them anytime for efficient studying.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">© 2025 StudyFlash. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

