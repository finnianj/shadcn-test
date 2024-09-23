"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Camera, Dumbbell, Heart, User } from "lucide-react"

export default function ProfilePage() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Fitness enthusiast and software developer",
    age: "30",
    gender: "male",
    height: "180",
    weight: "75",
  })

  const [fitnessGoals, setFitnessGoals] = useState({
    primaryGoal: "weight-loss",
    weeklyWorkouts: "3-4",
    preferredWorkoutTime: "morning",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    publicProfile: false,
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const handleFitnessGoalsChange = (name: string, value: string) => {
    setFitnessGoals({ ...fitnessGoals, [name]: value })
  }

  const handlePreferencesChange = (name: string, checked: boolean) => {
    setPreferences({ ...preferences, [name]: checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile updated:", { personalInfo, fitnessGoals, preferences })
    // Here you would typically send the data to your backend
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{personalInfo.name}</CardTitle>
                <CardDescription>{personalInfo.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Camera className="mr-2 h-4 w-4" /> Change Profile Picture
            </Button>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="goals">Fitness Goals</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" name="age" type="number" value={personalInfo.age} onChange={handlePersonalInfoChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={personalInfo.gender} onValueChange={(value) => setPersonalInfo({ ...personalInfo, gender: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input id="height" name="height" type="number" value={personalInfo.height} onChange={handlePersonalInfoChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" name="weight" type="number" value={personalInfo.weight} onChange={handlePersonalInfoChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={personalInfo.bio} onChange={handlePersonalInfoChange} />
                  </div>
                </TabsContent>
                <TabsContent value="goals" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryGoal">Primary Fitness Goal</Label>
                    <Select value={fitnessGoals.primaryGoal} onValueChange={(value) => handleFitnessGoalsChange("primaryGoal", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="endurance">Improve Endurance</SelectItem>
                        <SelectItem value="flexibility">Increase Flexibility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weeklyWorkouts">Weekly Workouts</Label>
                    <Select value={fitnessGoals.weeklyWorkouts} onValueChange={(value) => handleFitnessGoalsChange("weeklyWorkouts", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select workout frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 times per week</SelectItem>
                        <SelectItem value="3-4">3-4 times per week</SelectItem>
                        <SelectItem value="5+">5+ times per week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredWorkoutTime">Preferred Workout Time</Label>
                    <Select value={fitnessGoals.preferredWorkoutTime} onValueChange={(value) => handleFitnessGoalsChange("preferredWorkoutTime", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="preferences" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates about your progress</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => handlePreferencesChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={preferences.pushNotifications}
                      onCheckedChange={(checked) => handlePreferencesChange("pushNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme for the application</p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => handlePreferencesChange("darkMode", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="publicProfile">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                    </div>
                    <Switch
                      id="publicProfile"
                      checked={preferences.publicProfile}
                      onCheckedChange={(checked) => handlePreferencesChange("publicProfile", checked)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <Button type="submit" className="mt-6">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}