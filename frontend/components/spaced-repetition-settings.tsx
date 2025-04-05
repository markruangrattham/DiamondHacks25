"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export function SpacedRepetitionSettings() {
  const [enableSpacedRepetition, setEnableSpacedRepetition] = useState(false)
  const [intervalMultiplier, setIntervalMultiplier] = useState(2.5)
  const [reminderFrequency, setReminderFrequency] = useState("daily")
  const [prioritizeDifficult, setPrioritizeDifficult] = useState(true)

  const handleSaveSettings = () => {
    // In a real app, save these settings to the user's profile
    console.log("Saving spaced repetition settings:", {
      enableSpacedRepetition,
      intervalMultiplier,
      reminderFrequency,
      prioritizeDifficult,
    })

    // Show a success message
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spaced Repetition Settings</CardTitle>
          <CardDescription>Configure how you want to review flashcards over time for optimal retention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="spaced-repetition">Enable Spaced Repetition</Label>
              <p className="text-sm text-gray-500">Review cards at increasing intervals based on your performance</p>
            </div>
            <Switch
              id="spaced-repetition"
              checked={enableSpacedRepetition}
              onCheckedChange={setEnableSpacedRepetition}
            />
          </div>

          {enableSpacedRepetition && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Interval Multiplier: {intervalMultiplier.toFixed(1)}x</Label>
                  <p className="text-sm text-gray-500">How quickly intervals increase when you know a card well</p>
                  <Slider
                    value={[intervalMultiplier]}
                    min={1.5}
                    max={4}
                    step={0.1}
                    onValueChange={(value) => setIntervalMultiplier(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Shorter (1.5x)</span>
                    <span>Longer (4.0x)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
                <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
                  <SelectTrigger id="reminder-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="every-other-day">Every Other Day</SelectItem>
                    <SelectItem value="twice-weekly">Twice Weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="prioritize-difficult">Prioritize Difficult Cards</Label>
                  <p className="text-sm text-gray-500">Show harder cards more frequently in your review sessions</p>
                </div>
                <Switch
                  id="prioritize-difficult"
                  checked={prioritizeDifficult}
                  onCheckedChange={setPrioritizeDifficult}
                />
              </div>
            </>
          )}

          <Button onClick={handleSaveSettings} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Spaced Repetition</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Spaced repetition is a learning technique that incorporates increasing intervals of time between reviews of
            previously learned material to exploit the psychological spacing effect.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Research shows that spacing out your study sessions over time leads to better long-term retention compared
            to cramming all at once.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            With our system, cards you find difficult will appear more frequently, while cards you know well will appear
            less often, optimizing your study time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

