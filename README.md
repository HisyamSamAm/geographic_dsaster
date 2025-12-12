# SIG Kebencanaan Indonesia

Sistem Informasi Geografis (GIS) berbasis Next.js untuk visualisasi dan monitoring data kebencanaan di Indonesia secara real-time.

![SIG Kebencanaan Indonesia](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## Fitur Utama

- 🗺️ **Peta Interaktif** dengan Leaflet.js menampilkan lokasi bencana
- 📊 **Data Real-time** dari sumber terpercaya (BMKG, BNPB, MAGMA Indonesia)
- 🔍 **Filter Canggih** berdasarkan jenis bencana dan rentang tanggal
- 📱 **Responsive Design** untuk desktop dan mobile
- 🌙 **Dark Mode** professional untuk dashboard monitoring
- 📥 **Export Data** ke format CSV dan GeoJSON
- 🎯 **Marker Clustering** untuk performa optimal dengan banyak data
- ♿ **Accessible** dengan standar ARIA
- 📍 **Auto Fit Bounds** untuk zoom otomatis ke data terfilter
- 📈 **Statistik Real-time** jumlah terdampak dan korban

## Tech Stack

- **Framework**: Next.js 16 dengan App Router
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Maps**: Leaflet.js + Marker Cluster Plugin
- **Language**: TypeScript
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Instalasi

### Prerequisites

- Node.js 18+ dan npm/pnpm/yarn

### Setup Project

1. Clone atau download project ini

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Jalankan development server:

\`\`\`bash
npm run dev
\`\`\`

4. Buka browser di [http://localhost:3000](http://localhost:3000)

## Struktur Project

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout dengan dark mode
│   ├── page.tsx            # Main page dengan map & sidebar
│   └── globals.css         # Global styles & Leaflet overrides
├── components/
│   ├── disaster-card.tsx   # Card untuk list kejadian
│   ├── disaster-map.tsx    # Komponen peta dengan Leaflet
│   ├── disaster-sidebar.tsx # Sidebar dengan filter
│   ├── export-dialog.tsx   # Dialog export CSV/GeoJSON
│   ├── header.tsx          # Header aplikasi
│   ├── map-legend.tsx      # Legend jenis bencana
│   ├── stats-summary.tsx   # Statistik summary
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── types.ts            # TypeScript types
│   └── disaster-utils.ts   # Utility functions
└── public/
    └── data/
        └── disasters.json  # Data bencana (JSON)
\`\`\`

## Struktur Data

Data bencana disimpan di `public/data/disasters.json` dengan struktur:

\`\`\`json
{
  "disasters": [
    {
      "id": "unique-id",
      "name": "Nama Kejadian",
      "type": "earthquake | flood | volcanic | landslide | forest_fire | tsunami",
      "location": {
        "city": "Kota/Kabupaten",
        "province": "Provinsi"
      },
      "latitude": -6.1751,
      "longitude": 106.8650,
      "datetime": "2024-01-01T02:00:00+07:00",
      "details": "Deskripsi lengkap kejadian",
      "source": "https://sumber-data.go.id/",
      
      // Atribut opsional sesuai jenis bencana
      "magnitude": 5.6,
      "depth_km": 10,
      "water_level_m": 2.0,
      "affected_people": 15000,
      "casualties": {
        "deaths": 10,
        "injured": 50,
        "missing": 5
      },
      
      // Geometry opsional untuk area terdampak (GeoJSON)
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng, lat], ...]]
      }
    }
  ],
  "metadata": {
    "last_updated": "2024-12-13T10:00:00+07:00",
    "total_disasters": 8,
    "sources": ["BMKG", "BNPB", "MAGMA Indonesia"]
  }
}
\`\`\`

## Menambah Data Bencana

1. Edit file `public/data/disasters.json`
2. Tambahkan objek baru di array `disasters`
3. Pastikan koordinat berada di wilayah Indonesia (-11° to 6° lintang, 95° to 141° bujur)
4. Gunakan format datetime ISO 8601 dengan timezone `+07:00` (WIB) atau `+08:00` (WITA)
5. Sertakan `source` sebagai URL atau nama sumber terpercaya
6. Refresh halaman untuk melihat data baru

### Jenis Bencana yang Didukung

- `earthquake` - Gempa Bumi
- `flood` - Banjir
- `volcanic` - Gunung Berapi
- `landslide` - Tanah Longsor
- `forest_fire` - Kebakaran Hutan
- `tsunami` - Tsunami

## Sumber Data

Data dalam aplikasi ini bersumber dari:

- **BMKG** (Badan Meteorologi, Klimatologi, dan Geofisika) - [bmkg.go.id](https://www.bmkg.go.id/)
- **BNPB** (Badan Nasional Penanggulangan Bencana) - [bnpb.go.id](https://www.bnpb.go.id/)
- **MAGMA Indonesia** - [magma.esdm.go.id](https://magma.esdm.go.id/)
- **SIPONGI** (Sistem Informasi Kebakaran Hutan dan Lahan) - [sipongi.menlhk.go.id](https://sipongi.menlhk.go.id/)

## Fitur Utama

### 1. Peta Interaktif
- Marker untuk setiap kejadian dengan icon sesuai jenis bencana
- Popup detail saat marker diklik
- Clustering otomatis untuk performa optimal
- Polygon/polyline untuk area terdampak (jika tersedia)
- Zoom & pan dengan mouse/touch

### 2. Filter & Pencarian
- Filter berdasarkan jenis bencana (checkbox)
- Filter rentang tanggal (date picker)
- Reset filter dengan satu klik
- Daftar kejadian yang dapat diklik untuk fokus ke marker

### 3. Export Data
- Export ke CSV untuk analisis di Excel/Google Sheets
- Export ke GeoJSON untuk GIS software (QGIS, ArcGIS, dll)
- Export hanya data yang terfilter

### 4. Statistik
- Total kejadian bencana
- Total orang terdampak
- Total korban jiwa
- Jumlah provinsi terdampak

### 5. Responsive Design
- Desktop: Sidebar permanen di kiri
- Mobile: Sidebar slide-in dengan overlay
- Touch-friendly controls

## Deployment

### Deploy ke Vercel (Recommended)

1. Push kode ke GitHub repository

2. Import project di [vercel.com](https://vercel.com)

3. Vercel akan otomatis detect Next.js dan deploy

Atau gunakan Vercel CLI:

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Deploy ke Platform Lain

Project ini dapat di-deploy ke platform hosting statis lainnya:

\`\`\`bash
npm run build
\`\`\`

Output akan ada di folder `.next`. Untuk static export:

\`\`\`bash
# Add to next.config.mjs:
# output: 'export'

npm run build
\`\`\`

## Development

### Menambah Komponen shadcn/ui

\`\`\`bash
npx shadcn@latest add [component-name]
\`\`\`

### Testing Lokal

\`\`\`bash
npm run dev
\`\`\`

### Build untuk Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Aksesibilitas

Aplikasi ini memenuhi standar aksesibilitas:

- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ ARIA labels untuk screen readers
- ✅ Contrast ratio yang memenuhi WCAG 2.1 Level AA
- ✅ Focus indicators yang jelas
- ✅ Semantic HTML elements

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Kontribusi

Untuk berkontribusi:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## License

Project ini dibuat untuk tujuan edukasi dan monitoring kebencanaan.

## Credits

- Data bencana dari BMKG, BNPB, MAGMA Indonesia, dan SIPONGI
- Maps powered by [Leaflet](https://leafletjs.com/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Built with [Next.js](https://nextjs.org/)

## Support

Untuk pertanyaan atau issues, silakan buka GitHub Issues.

---

**Dibuat dengan ❤️ menggunakan [v0.app](https://v0.app)**
