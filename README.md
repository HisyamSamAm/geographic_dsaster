# Sistem Informasi Geografis Kebencanaan Indonesia

**Sistem Informasi Geografis (SIG) Kebencanaan** adalah platform pemantauan bencana real-time yang dirancang untuk menyajikan data visualisasi kejadian alam di seluruh wilayah Indonesia. Aplikasi ini dibuat dengan tujuan memberikan informasi yang akurat, cepat, dan mudah dipahami oleh masyarakat terkait sebaran lokasi bencana seperti gempa bumi, banjir, gunung meletus, hingga kebakaran hutan.

Dengan memanfaatkan teknologi pemetaan interaktif, pengguna dapat melihat detail kejadian secara spesifik, termasuk lokasi presisi, waktu kejadian, dampak yang ditimbulkan, serta sumber data terverifikasi. Platform ini mengintegrasikan data dari lembaga terpercaya seperti BMKG, BNPB, dan MAGMA Indonesia untuk menjamin validitas informasi yang disampaikan.

## Fitur Utama

Aplikasi ini dilengkapi dengan berbagai fitur unggulan untuk memudahkan pemantauan:

**Peta Interaktif dan Clustering**
Peta utama menggunakan teknologi Leaflet yang responsif, dilengkapi dengan sistem clustering canggih. Fitur ini memungkinkan ribuan titik data ditampilkan secara efisien tanpa memperberat kinerja perangkat. Setiap jenis bencana direpresentasikan dengan ikon dan warna spesifik untuk memudahkan identifikasi visual secara cepat.

**Filter dan Pencarian Lanjutan**
Pengguna dapat mencari data spesifik melalui sidebar filter yang komprehensif. Tersedia opsi penyaringan berdasarkan jenis bencana (seperti Gempa Bumi, Banjir, Tsunami) serta rentang waktu kejadian. Fitur pencarian ini sangat membantu peneliti atau pengamat untuk menganalisis tren bencana dalam periode tertentu.

**Visualisasi Data Statistik**
Selain peta, aplikasi menyajikan ringkasan statistik yang diperbarui secara real-time. Informasi seperti total kejadian, jumlah korban terdampak, dan sebaran wilayah ditampilkan dalam format yang ringkas namun informatif, memberikan gambaran umum situasi kebencanaan terkini.

**Dukungan Mode Gelap (Dark Mode)**
Antarmuka didesain modern dengan dukungan penuh untuk mode gelap. Hal ini tidak hanya memberikan estetika yang elegan tetapi juga kenyamanan visual saat melakukan pemantauan dalam kondisi pencahayaan rendah.

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan fondasi teknologi web modern untuk menjamin performa tinggi dan skalabilitas:

*   **Next.js 16 (App Router)**: Framework utama yang memberikan performa render server-side (SSR) optimal dan struktur routing yang efisien.
*   **React 19 & TypeScript**: Basis antarmuka yang reaktif dengan keamanan tipe data yang ketat untuk meminimalisir kesalahan sistem.
*   **Tailwind CSS v4 & Shadcn UI**: Sistem styling utility-first yang dipadukan dengan komponen UI yang aksesibel dan estetik.
*   **Leaflet.js**: Pustaka peta open-source ringan yang menjadi inti dari visualisasi geografis aplikasi ini.
*   **Marker Cluster**: Plugin visualisasi untuk mengelompokkan titik data yang berdekatan demi estetika dan performa peta.

## Panduan Instalasi

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Persiapan Lingkungan**: Pastikan Node.js (versi 18 atau terbaru) telah terinstal di komputer Anda.

2.  **Clone Repository**: Unduh kode sumber proyek ini ke direktori lokal Anda.

3.  **Instalasi Dependensi**: Buka terminal dan jalankan perintah instalasi paket:
    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```

4.  **Menjalankan Server Development**: Aktifkan server pengembangan lokal dengan perintah:
    ```bash
    npm run dev
    ```

5.  **Akses Aplikasi**: Buka browser dan kunjungi `http://localhost:3000`. Aplikasi siap digunakan.

## Struktur Data

Data bencana dikelola menggunakan format JSON standar yang terletak di `public/data/disasters.json`. Struktur data mencakup informasi vital seperti ID unik, koordinat (latitude/longitude), waktu kejadian (ISO 8601), dan detail dampak bencana. Format ini memudahkan integrasi dengan API eksternal di masa mendatang.

## Lisensi dan Sumber Data

Data yang ditampilkan dalam sistem ini bersumber dari publikasi terbuka lembaga negara terkait (BMKG, BNPB, MAGMA Indonesia). Proyek ini dirilis di bawah lisensi MIT, yang mengizinkan penggunaan, modifikasi, dan distribusi untuk tujuan edukasi maupun pengembangan lebih lanjut.

---
*Dikembangkan oleh [HisyamSamAm](https://github.com/HisyamSamAm) sebagai kontribusi untuk literasi kebencanaan digital.*
