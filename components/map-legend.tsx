"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { disasterTypeConfig } from "@/lib/disaster-utils"
import { ChevronDown, ChevronUp, Map } from "lucide-react"

export function MapLegend() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Card
      className={`absolute bottom-6 right-4 md:bottom-8 md:left-4 z-[1000] shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-min"
        }`}
    >
      <div
        className="flex items-center justify-between px-2 cursor-pointer bg-card hover:bg-accent/50 transition-colors gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Map className="h-4 w-4 shrink-0" />
          <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">Legenda</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen && (
        <div className="px-3 pb-3 animate-in slide-in-from-top-2 duration-200">
          <div className="h-px bg-border mb-2" />
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            {Object.entries(disasterTypeConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs shrink-0"
                  style={{ backgroundColor: config.color }}
                >
                  <span className="text-[10px]">{config.icon}</span>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
