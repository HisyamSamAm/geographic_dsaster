"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { MapLegend } from "@/components/map-legend"
import { DisasterSidebar } from "@/components/disaster-sidebar"
import { StatsSummary } from "@/components/stats-summary"
import { Button } from "@/components/ui/button"
import type { DisasterData, Disaster, DisasterType } from "@/lib/types"
import { Loader2, Menu, Maximize2 } from "lucide-react"

// Dynamic import map component to prevent SSR issues with Leaflet
const DisasterMap = dynamic(() => import("@/components/disaster-map").then((mod) => mod.DisasterMap), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-card">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Memuat peta interaktif...</span>
      </div>
    </div>
  ),
})

export default function Home() {
  const [data, setData] = useState<DisasterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<Set<DisasterType>>(new Set())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const [fitBoundsKey, setFitBoundsKey] = useState(0)
  const [selectedDisaster, setSelectedDisaster] = useState<Disaster | null>(null)

  useEffect(() => {
    fetch("/data/disasters.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data")
        return res.json()
      })
      .then((data: DisasterData) => {
        // Validate data
        const validDisasters = data.disasters.filter((d) => {
          const hasValidCoords = d.latitude && d.longitude
          const hasValidDate = d.datetime && !isNaN(Date.parse(d.datetime))
          return hasValidCoords && hasValidDate
        })

        setData({
          ...data,
          disasters: validDisasters,
        })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filteredDisasters =
    data?.disasters.filter((disaster) => {
      // Type filter
      if (selectedTypes.size > 0 && !selectedTypes.has(disaster.type)) {
        return false
      }

      // Date range filter
      const disasterDate = new Date(disaster.datetime)
      if (startDate && disasterDate < startDate) {
        return false
      }
      if (endDate) {
        const endOfDay = new Date(endDate)
        endOfDay.setHours(23, 59, 59, 999)
        if (disasterDate > endOfDay) {
          return false
        }
      }

      return true
    }) || []

  const handleTypeToggle = useCallback((type: DisasterType) => {
    setSelectedTypes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(type)) {
        newSet.delete(type)
      } else {
        newSet.add(type)
      }
      return newSet
    })
  }, [])

  const handleResetFilters = useCallback(() => {
    setSelectedTypes(new Set())
    setStartDate(null)
    setEndDate(null)
  }, [])

  const handleDisasterClick = useCallback((disaster: Disaster) => {
    // Sidebar will close on mobile after clicking
    setSidebarOpen(false)
    console.log("[GeoDisaster] Disaster clicked:", disaster.name)
    setSelectedDisaster(disaster)
  }, [])

  const handleFitBounds = useCallback(() => {
    setFitBoundsKey((prev) => prev + 1)
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg text-foreground">Memuat data kebencanaan...</span>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{error || "Data tidak tersedia"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <DisasterSidebar
          disasters={filteredDisasters}
          selectedTypes={selectedTypes}
          onTypeToggle={handleTypeToggle}
          onDisasterClick={handleDisasterClick}
          onResetFilters={handleResetFilters}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Map Container */}
        <main className="flex-1 relative">
          <DisasterMap
            key={fitBoundsKey}
            disasters={filteredDisasters}
            fitBounds={fitBoundsKey > 0}
            selectedDisaster={selectedDisaster}
          />
          <MapLegend />
          <StatsSummary disasters={filteredDisasters} />

          {/* Control buttons */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            <Button
              size="icon"
              className="md:hidden shadow-lg"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="shadow-lg"
              onClick={handleFitBounds}
              aria-label="Sesuaikan tampilan peta"
              title="Fit to Data"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats badge - top center */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
            <div className="bg-card/95 backdrop-blur-sm border border-border shadow-lg rounded-full px-4 py-2">
              <p className="text-sm font-medium text-foreground">
                Menampilkan <span className="text-primary font-semibold">{filteredDisasters.length}</span> dari{" "}
                {data.disasters.length} kejadian
              </p>
            </div>
          </div>

          {/* Last updated info - bottom left on desktop */}
          <div className="absolute bottom-4 left-4 z-[1000] hidden md:block">
            <div className="bg-card/95 backdrop-blur-sm border border-border shadow-sm rounded px-3 py-1.5">
              <p className="text-xs text-muted-foreground">
                Terakhir diperbarui:{" "}
                {new Date(data.metadata.last_updated).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
