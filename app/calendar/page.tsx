"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dumbbell, Plus, Running, Swim, Yoga } from "lucide-react"

type Workout = {
  id: string
  date: Date
  type: string
  duration: number
  notes: string
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: "1", date: new Date(2023, 8, 15), type: "strength", duration: 60, notes: "Upper body focus" },
    { id: "2", date: new Date(2023, 8, 17), type: "cardio", duration: 45, notes: "5k run" },
    { id: "3", date: new Date(2023, 8, 20), type: "yoga", duration: 30, notes: "Relaxation session" },
  ])
  const [newWorkout, setNewWorkout] = useState<Omit<Workout, "id">>({
    date: new Date(),
    type: "strength",
    duration: 30,
    notes: "",
  })

  const handleAddWorkout = () => {
    const workout: Workout = {
      ...newWorkout,
      id: Date.now().toString(),
      date: date || new Date(),
    }
    setWorkouts([...workouts, workout])
    setNewWorkout({ date: new Date(), type: "strength", duration: 30, notes: "" })
  }

  const getWorkoutsForDate = (date: Date) => {
    return workouts.filter(
      (workout) =>
        workout.date.getDate() === date.getDate() &&
        workout.date.getMonth() === date.getMonth() &&
        workout.date.getFullYear() === date.getFullYear()
    )
  }

  const workoutIcons: { [key: string]: React.ReactNode } = {
    strength: <Dumbbell className="h-4 w-4" />,
    cardio: <Running className="h-4 w-4" />,
    yoga: <Yoga className="h-4 w-4" />,
    swimming: <Swim className="h-4 w-4" />,
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Workout Calendar</h1>
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your workout schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              components={{
                DayContent: ({ date }) => (
                  <div className="relative h-9 w-9 p-0 flex items-center justify-center">
                    <span>{date.getDate()}</span>
                    {getWorkoutsForDate(date).length > 0 && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </div>
                ),
              }}
            />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workouts for {date?.toDateString()}</CardTitle>
            </CardHeader>
            <CardContent>
              {getWorkoutsForDate(date || new Date()).length === 0 ? (
                <p className="text-muted-foreground">No workouts scheduled for this day.</p>
              ) : (
                <ul className="space-y-2">
                  {getWorkoutsForDate(date || new Date()).map((workout) => (
                    <li key={workout.id} className="flex items-center space-x-2">
                      {workoutIcons[workout.type]}
                      <span className="font-medium">{workout.type}</span>
                      <span className="text-muted-foreground">({workout.duration} min)</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Workout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Workout</DialogTitle>
                    <DialogDescription>
                      Schedule a new workout for {date?.toDateString()}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="workout-type" className="text-right">
                        Type
                      </Label>
                      <Select
                        value={newWorkout.type}
                        onValueChange={(value) => setNewWorkout({ ...newWorkout, type: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select workout type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strength">Strength</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="yoga">Yoga</SelectItem>
                          <SelectItem value="swimming">Swimming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="duration" className="text-right">
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newWorkout.duration}
                        onChange={(e) => setNewWorkout({ ...newWorkout, duration: parseInt(e.target.value) })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Notes
                      </Label>
                      <Input
                        id="notes"
                        value={newWorkout.notes}
                        onChange={(e) => setNewWorkout({ ...newWorkout, notes: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddWorkout}>Add Workout</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}