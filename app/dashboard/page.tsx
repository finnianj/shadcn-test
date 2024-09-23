"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calendar, Dumbbell, Flame, Heart, Link, Trophy, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"


export default function DashboardPage() {
    const router = useRouter()
  const [caloriesBurned, setCaloriesBurned] = useState(1850)
  const [stepsCount, setStepsCount] = useState(8234)
  const [activeMins, setActiveMins] = useState(95)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-2xl font-bold">FitTrack Dashboard</h1>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/calendar')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/achievements')}>
                        <Trophy className="mr-2 h-4 w-4" />
                        <span>Achievements</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{caloriesBurned}</div>
              <Progress value={caloriesBurned / 30} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Daily Goal: 3000 kcal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Steps</CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stepsCount}</div>
              <Progress value={stepsCount / 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Daily Goal: 10,000 steps</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Minutes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeMins}</div>
              <Progress value={activeMins / 1.5} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Daily Goal: 150 minutes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Workouts</CardTitle>
              <CardDescription>Your next 3 scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Upper Body Strength</p>
                    <p className="text-sm text-muted-foreground">Tomorrow, 9:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Cardio Session</p>
                    <p className="text-sm text-muted-foreground">Wednesday, 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Lower Body Strength</p>
                    <p className="text-sm text-muted-foreground">Friday, 10:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}