"use client"

import { Card } from "@/components/ui/card"
import { disasterTypeConfig } from "@/lib/disaster-utils"

export function MapLegend() {
  return (
    <Card className="absolute bottom-4 left-4 z-[1000] p-3 shadow-lg">
      <h3 className="text-xs font-semibold mb-2 text-foreground">Legenda</h3>
      <div className="space-y-1.5">
        {Object.entries(disasterTypeConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs"
              style={{ backgroundColor: config.color }}
            >
              <span className="text-[10px]">{config.icon}</span>
            </div>
            <span className="text-xs text-muted-foreground">{config.label}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
