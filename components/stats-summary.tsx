"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Disaster } from "@/lib/types"
import { AlertTriangle, Users, MapPin, TrendingUp } from "lucide-react"

interface StatsSummaryProps {
  disasters: Disaster[]
}

export function StatsSummary({ disasters }: StatsSummaryProps) {
  const totalAffected = disasters.reduce((sum, d) => sum + (d.affected_people || 0), 0)
  const totalDeaths = disasters.reduce((sum, d) => sum + (d.casualties?.deaths || 0), 0)
  const provinces = new Set(disasters.map((d) => d.location.province)).size

  return (
    <div className="absolute bottom-4 right-4 z-[1000] hidden lg:flex flex-col gap-2 w-64">
      <Card className="bg-card/95 backdrop-blur-sm shadow-lg border-border">
        <CardContent className="p-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <AlertTriangle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Total Kejadian</p>
                <p className="text-lg font-semibold text-foreground">{disasters.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-secondary/10">
                <Users className="h-4 w-4 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Terdampak</p>
                <p className="text-lg font-semibold text-foreground">{totalAffected.toLocaleString("id-ID")}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-destructive/10">
                <TrendingUp className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Korban Jiwa</p>
                <p className="text-lg font-semibold text-foreground">{totalDeaths.toLocaleString("id-ID")}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent/50">
                <MapPin className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Provinsi</p>
                <p className="text-lg font-semibold text-foreground">{provinces}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
