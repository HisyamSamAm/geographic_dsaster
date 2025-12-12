"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DisasterCard } from "@/components/disaster-card"

import type { Disaster, DisasterType } from "@/lib/types"
import { disasterTypeConfig } from "@/lib/disaster-utils"
import { Filter, X, Calendar, RotateCcw } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface DisasterSidebarProps {
  disasters: Disaster[]
  selectedTypes: Set<DisasterType>
  onTypeToggle: (type: DisasterType) => void
  onDisasterClick: (disaster: Disaster) => void
  onResetFilters: () => void
  startDate: Date | null
  endDate: Date | null
  onStartDateChange: (date: Date | null) => void
  onEndDateChange: (date: Date | null) => void
  isOpen: boolean
  onClose: () => void
}

export function DisasterSidebar({
  disasters,
  selectedTypes,
  onTypeToggle,
  onDisasterClick,
  onResetFilters,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  isOpen,
  onClose,
}: DisasterSidebarProps) {
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  const allTypes = Object.keys(disasterTypeConfig) as DisasterType[]
  const hasActiveFilters = selectedTypes.size > 0 || startDate || endDate

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50
          w-80 h-full bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Filter & Data</h2>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose} aria-label="Tutup sidebar">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4 space-y-6">
            {/* Type Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Jenis Bencana</h3>
                {selectedTypes.size > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto py-1 px-2 text-xs"
                    onClick={() => allTypes.forEach((type) => selectedTypes.has(type) && onTypeToggle(type))}
                  >
                    Hapus Semua
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                {allTypes.map((type) => {
                  const config = disasterTypeConfig[type]
                  const count = disasters.filter((d) => d.type === type).length
                  const isChecked = selectedTypes.has(type)

                  return (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox id={`type-${type}`} checked={isChecked} onCheckedChange={() => onTypeToggle(type)} />
                      <Label htmlFor={`type-${type}`} className="flex items-center gap-2 flex-1 cursor-pointer text-sm">
                        <div
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: config.color }}
                        />
                        <span className="flex-1">{config.label}</span>
                        <span className="text-xs text-muted-foreground">({count})</span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Rentang Tanggal</h3>

              <div className="space-y-2">
                <div>
                  <Label htmlFor="start-date" className="text-xs text-muted-foreground mb-1 block">
                    Dari Tanggal
                  </Label>
                  <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-transparent"
                        id="start-date"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: id }) : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={startDate || undefined}
                        onSelect={(date) => {
                          onStartDateChange(date || null)
                          setShowStartCalendar(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {startDate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-1 text-xs h-7"
                      onClick={() => onStartDateChange(null)}
                    >
                      Hapus
                    </Button>
                  )}
                </div>

                <div>
                  <Label htmlFor="end-date" className="text-xs text-muted-foreground mb-1 block">
                    Sampai Tanggal
                  </Label>
                  <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-transparent"
                        id="end-date"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: id }) : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={endDate || undefined}
                        onSelect={(date) => {
                          onEndDateChange(date || null)
                          setShowEndCalendar(false)
                        }}
                        initialFocus
                        disabled={(date) => (startDate ? date < startDate : false)}
                      />
                    </PopoverContent>
                  </Popover>
                  {endDate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-1 text-xs h-7"
                      onClick={() => onEndDateChange(null)}
                    >
                      Hapus
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <Button variant="outline" className="w-full bg-transparent" onClick={onResetFilters}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Semua Filter
              </Button>
            )}



            {/* Disaster List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Daftar Kejadian</h3>
                <span className="text-xs text-muted-foreground">{disasters.length} kejadian</span>
              </div>

              {disasters.length === 0 ? (
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground text-center">Tidak ada data dengan filter ini</p>
                </Card>
              ) : (
                <div className="space-y-2">
                  {disasters.map((disaster) => (
                    <DisasterCard key={disaster.id} disaster={disaster} onClick={() => onDisasterClick(disaster)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
