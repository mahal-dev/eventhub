import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, UserPlus, Edit, Trash2 } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "event_created",
      title: "New event created",
      description: "Tech Conference 2024 was created",
      time: "2 hours ago",
      icon: Calendar,
      user: "John Doe",
    },
    {
      id: 2,
      type: "registration",
      title: "New registration",
      description: "Sarah Johnson registered for Product Launch Event",
      time: "4 hours ago",
      icon: UserPlus,
      user: "Sarah Johnson",
    },
    {
      id: 3,
      type: "event_updated",
      title: "Event updated",
      description: "Networking Mixer details were updated",
      time: "6 hours ago",
      icon: Edit,
      user: "John Doe",
    },
    {
      id: 4,
      type: "registration",
      title: "New registration",
      description: "Mike Chen registered for Tech Conference 2024",
      time: "8 hours ago",
      icon: UserPlus,
      user: "Mike Chen",
    },
    {
      id: 5,
      type: "event_deleted",
      title: "Event cancelled",
      description: "Monthly Meetup was cancelled",
      time: "1 day ago",
      icon: Trash2,
      user: "John Doe",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">by {activity.user}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
