"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Disaster } from "@/lib/types"
import { disasterTypeConfig, formatDateTime } from "@/lib/disaster-utils"
import { MapPin, Calendar, Users } from "lucide-react"

interface DisasterCardProps {
  disaster: Disaster
  onClick: () => void
}

export function DisasterCard({ disaster, onClick }: DisasterCardProps) {
  const config = disasterTypeConfig[disaster.type]

  return (
    <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-sm text-foreground line-clamp-1">{disaster.name}</h3>
          <Badge
            variant="outline"
            className="shrink-0 text-xs"
            style={{ borderColor: config.color, color: config.color }}
          >
            {config.label}
          </Badge>
        </div>

        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">
              {disaster.location.city}, {disaster.location.province}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">{formatDateTime(disaster.datetime)}</span>
          </div>

          {disaster.affected_people && (
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 shrink-0" />
              <span>{disaster.affected_people.toLocaleString("id-ID")} orang terdampak</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
