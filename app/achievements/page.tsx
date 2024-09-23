"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, Dumbbell, Flame, Heart, Trophy, Zap } from "lucide-react"

type Achievement = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  progress: number
  completed: boolean
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      name: "Workout Warrior",
      description: "Complete 10 workouts",
      icon: <Dumbbell className="h-6 w-6" />,
      progress: 70,
      completed: false,
    },
    {
      id: "2",
      name: "Calorie Crusher",
      description: "Burn 5000 calories",
      icon: <Flame className="h-6 w-6" />,
      progress: 100,
      completed: true,
    },
    {
      id: "3",
      name: "Early Bird",
      description: "Complete 5 morning workouts",
      icon: <Zap className="h-6 w-6" />,
      progress: 40,
      completed: false,
    },
    {
      id: "4",
      name: "Endurance Master",
      description: "Run a total of 50km",
      icon: <Heart className="h-6 w-6" />,
      progress: 90,
      completed: false,
    },
    {
      id: "5",
      name: "Strength Champion",
      description: "Lift 1000kg total in one session",
      icon: <Trophy className="h-6 w-6" />,
      progress: 60,
      completed: false,
    },
  ])

  const completedAchievements = achievements.filter((achievement) => achievement.completed)
  const inProgressAchievements = achievements.filter((achievement) => !achievement.completed)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Achievements</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Achievement Progress</CardTitle>
            <CardDescription>Your journey to fitness mastery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Achievements</span>
                <span className="text-sm font-medium">{completedAchievements.length} / {achievements.length}</span>
              </div>
              <Progress value={(completedAchievements.length / achievements.length) * 100} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fitness Score</CardTitle>
            <CardDescription>Based on your achievements and activity</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl font-bold">{750}</span>
              <p className="text-sm text-muted-foreground mt-2">Keep it up!</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Achievements</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full">
            {achievement.icon}
          </div>
          <div>
            <CardTitle className="text-lg">{achievement.name}</CardTitle>
            <CardDescription>{achievement.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{achievement.progress}%</span>
          </div>
          <Progress value={achievement.progress} />
        </div>
      </CardContent>
      <CardFooter>
        {achievement.completed ? (
          <Badge variant="secondary" className="w-full justify-center">
            <Award className="mr-2 h-4 w-4" /> Completed
          </Badge>
        ) : (
          <Button variant="outline" className="w-full">View Details</Button>
        )}
      </CardFooter>
    </Card>
  )
}