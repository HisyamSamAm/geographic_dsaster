"use client"

import { useEffect, useRef, useState } from "react"
import type { Disaster } from "@/lib/types"
import { disasterTypeConfig, formatDateTime } from "@/lib/disaster-utils"

interface DisasterMapProps {
  disasters: Disaster[]
  onMarkerClick?: (disaster: Disaster) => void
  fitBounds?: boolean
  selectedDisaster?: Disaster | null
}

export function DisasterMap({ disasters, onMarkerClick, fitBounds = false, selectedDisaster }: DisasterMapProps) {
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapReady, setMapReady] = useState(false)

  // Fly to selected disaster
  useEffect(() => {
    if (!mapRef.current || !selectedDisaster) return

    const { latitude, longitude } = selectedDisaster
    mapRef.current.setView([latitude, longitude], 13, {
      animate: true,
      duration: 1.5,
    })

    // Open popup if possible (requires finding the marker, which is hard with clustering,
    // so just zooming is a good first step)
  }, [selectedDisaster])

  useEffect(() => {
    const checkLibraries = () => {
      if (typeof window !== "undefined") {
        const L = (window as any).L
        if (L && L.markerClusterGroup) {
          console.log("[GeoDisaster] Leaflet libraries loaded successfully")
          setMapReady(true)
          return
        }
      }
      setTimeout(checkLibraries, 100)
    }
    checkLibraries()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current || !mapReady) return

    const L = (window as any).L
    if (!L || !L.markerClusterGroup) {
      console.log("[GeoDisaster] Leaflet not ready yet")
      return
    }

    console.log("[GeoDisaster] Initializing map with", disasters.length, "disasters")

    let isMounted = true

    if (!mapRef.current) {
      try {
        mapRef.current = L.map(mapContainerRef.current, {
          center: [-2.5, 118.0],
          zoom: 5,
          zoomControl: true,
        })

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18,
        }).addTo(mapRef.current)

        setIsLoading(false)
        console.log("[GeoDisaster] Map initialized")
      } catch (error) {
        console.error("[GeoDisaster] Error initializing map:", error)
        return
      }
    }

    if (!isMounted) return

    if (markersRef.current) {
      mapRef.current.removeLayer(markersRef.current)
    }

    try {
      markersRef.current = L.markerClusterGroup({
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: (cluster: any) => {
          const count = cluster.getChildCount()
          let size = "small"
          if (count > 10) size = "large"
          else if (count > 5) size = "medium"

          return L.divIcon({
            html: `<div class="cluster-icon cluster-${size}"><span>${count}</span></div>`,
            className: "custom-cluster-icon",
            iconSize: L.point(40, 40),
          })
        },
      })

      disasters.forEach((disaster) => {
        if (!markersRef.current || !mapRef.current) return

        const config = disasterTypeConfig[disaster.type as keyof typeof disasterTypeConfig]
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              background-color: ${config.color};
              width: 32px;
              height: 32px;
              border-radius: 50%;
              border: 3px solid white;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              cursor: pointer;
            ">
              <span style="font-size: 16px;">${config.icon}</span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16],
        })

        const marker = L.marker([disaster.latitude, disaster.longitude], {
          icon: customIcon,
        })

        const popupContent = document.createElement("div")
        popupContent.className = "p-4 min-w-[280px] max-w-[320px]"
        popupContent.innerHTML = `
          <div class="space-y-3">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold text-base text-foreground">${disaster.name}</h3>
              <span class="px-2 py-1 text-xs rounded-md border shrink-0" style="border-color: ${disasterTypeConfig[disaster.type].color}; color: ${disasterTypeConfig[disaster.type].color}">
                ${disasterTypeConfig[disaster.type].label}
              </span>
            </div>
            
            <div class="space-y-2 text-sm">
              <div class="flex items-start gap-2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="shrink-0 mt-0.5"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <div class="font-medium text-foreground">${disaster.location.city}, ${disaster.location.province}</div>
                  <div class="text-xs">${disaster.latitude.toFixed(4)}°, ${disaster.longitude.toFixed(4)}°</div>
                </div>
              </div>

              <div class="flex items-start gap-2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="shrink-0 mt-0.5"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                <span>${formatDateTime(disaster.datetime)}</span>
              </div>

              ${disaster.magnitude
            ? `
                <div class="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="shrink-0"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>
                  <span><strong class="text-foreground">Magnitudo:</strong> ${disaster.magnitude} SR${disaster.depth_km ? `, Kedalaman: ${disaster.depth_km} km` : ""}</span>
                </div>
              `
            : ""
          }

              ${disaster.water_level_m
            ? `
                <div class="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="shrink-0"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                  <span><strong class="text-foreground">Ketinggian Air:</strong> ${disaster.water_level_m} meter</span>
                </div>
              `
            : ""
          }

              ${disaster.wave_height_m
            ? `
                <div class="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="shrink-0"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
                  <span><strong class="text-foreground">Tinggi Gelombang:</strong> ${disaster.wave_height_m} meter</span>
                </div>
              `
            : ""
          }

              ${disaster.affected_people
            ? `
                <div class="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <span><strong class="text-foreground">Terdampak:</strong> ${disaster.affected_people.toLocaleString("id-ID")} orang</span>
                </div>
              `
            : ""
          }

              ${disaster.casualties
            ? `
                <div class="p-2 bg-destructive/10 border border-destructive/20 rounded text-xs">
                  <strong class="text-destructive">Korban:</strong>
                  ${disaster.casualties.deaths ? ` ${disaster.casualties.deaths} meninggal` : ""}
                  ${disaster.casualties.injured ? ` · ${disaster.casualties.injured} luka-luka` : ""}
                  ${disaster.casualties.missing ? ` · ${disaster.casualties.missing} hilang` : ""}
                </div>
              `
            : ""
          }
            </div>

            <div class="pt-2 border-t border-border">
              <p class="text-xs text-muted-foreground mb-2">${disaster.details}</p>
              <a href="${disaster.source}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                Sumber Data
              </a>
            </div>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 320,
          className: "custom-popup",
        })

        marker.on("click", () => {
          console.log("[GeoDisaster] Disaster clicked:", disaster.name)
          if (onMarkerClick) {
            onMarkerClick(disaster)
          }
        })

        marker.addTo(markersRef.current)

        if (disaster.geometry && mapRef.current) {
          L.geoJSON(disaster.geometry, {
            style: {
              color: disasterTypeConfig[disaster.type].color,
              weight: 2,
              fillOpacity: 0.2,
            },
          }).addTo(mapRef.current)
        }
      })

      if (markersRef.current && mapRef.current) {
        mapRef.current.addLayer(markersRef.current)
        console.log("[GeoDisaster] Added", disasters.length, "markers to map")
      }

      if (fitBounds && disasters.length > 0 && mapRef.current) {
        const bounds = disasters.map((d) => [d.latitude, d.longitude] as [number, number])
        mapRef.current.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 12,
        })
      }
    } catch (error) {
      console.error("[GeoDisaster] Error creating markers:", error)
    }

    return () => {
      isMounted = false
    }
  }, [disasters, fitBounds, onMarkerClick, mapReady])

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full rounded-lg" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Memuat peta...</span>
          </div>
        </div>
      )}
    </div>
  )
}
