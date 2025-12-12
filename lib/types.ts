import type { GeoJSON } from "geojson"

export interface Disaster {
  id: string
  name: string
  type: DisasterType
  location: {
    city: string
    province: string
  }
  latitude: number
  longitude: number
  datetime: string
  details: string
  source: string

  // Optional type-specific attributes
  magnitude?: number
  depth_km?: number
  water_level_m?: number
  affected_people?: number
  casualties?: {
    deaths?: number
    missing?: number
    injured?: number
  }
  displaced?: number
  volcano_alert_level?: string
  ash_column_height_m?: number
  pyroclastic_flow_distance_km?: number
  affected_area_hectares?: number
  burned_area_hectares?: number
  air_quality_index?: number
  hotspots?: number
  wave_height_m?: number
  trigger?: string
  tsunami?: boolean
  liquefaction?: boolean
  // New fields for ecological/conservation
  affected_species?: string
  estimated_habitat_hectares_lost?: number
  conservation_concern?: string
  geometry?: GeoJSON.Geometry
}

export type DisasterType =
  | "earthquake"
  | "flood"
  | "volcanic"
  | "landslide"
  | "forest_fire"
  | "tsunami"
  | "flood_landslide"
  | "building_fire"
  | "ecological"

export interface DisasterData {
  disasters: Disaster[]
  metadata: {
    last_updated: string
    total_disasters: number
    sources: string[]
  }
}

export interface FilterState {
  types: Set<DisasterType>
  startDate: Date | null
  endDate: Date | null
}
