"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare } from "lucide-react"

interface BulkMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCount: number
  onSend: () => void
}

export function BulkMessageDialog({ open, onOpenChange, selectedCount, onSend }: BulkMessageDialogProps) {
  const [messageType, setMessageType] = useState("email")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    setIsLoading(true)
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    onSend()
    // Reset form
    setSubject("")
    setMessage("")
  }

  const messageTemplates = {
    welcome: {
      subject: "Welcome to our event!",
      message: "Thank you for registering for our event. We're excited to see you there!",
    },
    reminder: {
      subject: "Event reminder - Don't forget!",
      message: "This is a friendly reminder about the upcoming event. We look forward to seeing you!",
    },
    checkin: {
      subject: "Check-in instructions",
      message: "Here are your check-in instructions for the event. Please arrive 15 minutes early.",
    },
  }

  const applyTemplate = (templateKey: keyof typeof messageTemplates) => {
    const template = messageTemplates[templateKey]
    setSubject(template.subject)
    setMessage(template.message)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {messageType === "email" ? <Mail className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
            Send Bulk Message
          </DialogTitle>
          <DialogDescription>Send a message to {selectedCount} selected attendees.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Message Type</Label>
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quick Templates</Label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => applyTemplate("welcome")}>
                Welcome
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => applyTemplate("reminder")}>
                Reminder
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => applyTemplate("checkin")}>
                Check-in
              </Button>
            </div>
          </div>

          {messageType === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder={messageType === "email" ? "Enter your email message" : "Enter your SMS message"}
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {messageType === "sms" && (
              <p className="text-xs text-muted-foreground">SMS messages are limited to 160 characters.</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={isLoading || !message.trim()}>
            {isLoading ? "Sending..." : `Send to ${selectedCount} attendees`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
