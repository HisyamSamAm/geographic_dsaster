import type { Disaster } from "./types"

export function getBounds(disasters: Disaster[]): [[number, number], [number, number]] | null {
  if (disasters.length === 0) return null

  const lats = disasters.map((d) => d.latitude)
  const lngs = disasters.map((d) => d.longitude)

  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ]
}

export function getCentroid(disasters: Disaster[]): [number, number] {
  if (disasters.length === 0) return [-2.5, 118.0] // Center of Indonesia

  const avgLat = disasters.reduce((sum, d) => sum + d.latitude, 0) / disasters.length
  const avgLng = disasters.reduce((sum, d) => sum + d.longitude, 0) / disasters.length

  return [avgLat, avgLng]
}

export const disasterTypeConfig = {
  earthquake: {
    label: "Gempa Bumi",
    color: "#dc2626",
    icon: "🏚️",
  },
  flood: {
    label: "Banjir",
    color: "#2563eb",
    icon: "🌊",
  },
  volcanic: {
    label: "Gunung Berapi",
    color: "#ea580c",
    icon: "🌋",
  },
  landslide: {
    label: "Tanah Longsor",
    color: "#92400e",
    icon: "⛰️",
  },
  forest_fire: {
    label: "Kebakaran Hutan",
    color: "#f97316",
    icon: "🔥",
  },
  tsunami: {
    label: "Tsunami",
    color: "#0891b2",
    icon: "🌊",
  },
  flood_landslide: {
    label: "Banjir & Longsor",
    color: "#0d9488",
    icon: "⛈️",
  },
  building_fire: {
    label: "Kebakaran Gedung",
    color: "#b91c1c",
    icon: "🏢",
  },
  ecological: {
    label: "Dampak Ekologis",
    color: "#15803d",
    icon: "🍃",
  },
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(date)
}


