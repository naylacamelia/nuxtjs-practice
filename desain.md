## 1. Design Principles
Sistem desain ini menggunakan estetika *modern, clean SaaS* dengan sentuhan editorial (Lattice-inspired). Fokus utama adalah ruang bernapas yang lega (whitespace), tipografi berukuran besar dengan kontras tinggi, grid bento yang rapi tanpa celah, dan penggunaan bentuk membulat penuh (pill-shape) pada elemen interaktif.

## 2. Color Palette
| Kategori | Hex Code | Penggunaan |
| :--- | :--- | :--- |
| **Primary Brand / Text** | `#111827` (Off-black) | Teks utama, judul, tombol CTA utama. Memberikan kesan bold dan premium. |
| **Background - App** | `#FFFFFF` (Pure White) | Latar belakang utama aplikasi. Bersih dan luas. |
| **Background - Bento/Cards** | `#F3F4F6` atau `#E5E7EB` | Latar belakang kartu bento atau area sekunder. Warm-gray lembut untuk kontras dengan putih. |
| **Soft Accent** | `#E5E7EB` (Gray 200) | Hover state, latar belakang label/tags (badges). |
| **Text - Muted** | `#6B7280` (Gray 500) | Teks pendukung, deksripsi sekunder, placeholder. |
| **Border/Line** | `#E5E7EB` atau `#D1D5DB` | Garis pembatas yang sangat halus dan tipis. |

## 3. Typography
*   **Font Family Utama:** *Sans-Serif* Geometris yang clean (Satoshi, Geist, atau Inter). Tipografi harus terlihat *editorial* dengan kontras ketebalan yang jelas.
*   **Hirarki Skala Teks:**
    *   `Display` (Hero Section): Sangat besar, max 3 baris. *Tracking* rapat (tight).
    *   `H1`: 48px - 64px (Bold).
    *   `H2`: 36px (Semi-Bold).
    *   `H3`: 24px (Medium).
    *   `Body Large`: 18px (Regular).
    *   `Body Base`: 16px (Regular).

## 4. Spacing & Grid System
*   **Whitespace:** Gunakan padding vertikal yang masif antar section (misal: `py-24` atau `py-32`) agar terasa lega dan sinematik.
*   **Bento Grid:** Gunakan `grid-flow-dense` agar tidak ada sel kosong. Padukan ukuran *span* yang berbeda untuk estetika asimetris (misal *col-span-2*, *row-span-2*).
*   **Card Padding:** Minimal `p-8` (32px) pada dalam kartu agar konten tidak terasa sesak.

## 5. UI Components

### A. Buttons (Tombol)
*   **Bentuk:** Selalu **Pill-shaped** (`rounded-full`).
*   **Primary:** Latar belakang Off-Black (`#111827`), teks Putih. Interaksi hover menggunakan GSAP `scale-105`.
*   **Secondary/Tags:** Latar belakang abu-abu terang (`#F3F4F6`), teks hitam. 

### B. Cards & Containers
*   **Radius Sudut (Border Radius):** Melengkung besar (`rounded-3xl` atau `24px` - `32px`) untuk gaya *bento grid*.
*   **Efek Bayangan (Drop Shadow):** Sangat minim atau tanpa shadow. Fokus pada pemisahan melalui kontras warna background (Putih vs Abu-abu muda).

### C. Badges & Tags (Label Kategori)
*   **Bentuk:** Sudut sangat membulat (pil / `rounded-full`).
*   **Warna:** Latar belakang *Soft Accent* abu-abu.
*   **Teks:** Reguler atau Medium, tidak harus selalu uppercase.

## 6. Motion & GSAP (Animasi)
*   **Interaktif Hover:** Semua kartu dan tombol *clickable* menggunakan GSAP atau Tailwind `group-hover:scale-105 transition-transform duration-700 ease-out`.
*   **Scroll Reveal:** Gunakan GSAP `ScrollTrigger` untuk memunculkan elemen saat di-scroll (stagger fade-up, scale-up ringan pada gambar).
*   **Parallax & Parallax Image:** Gambar di dalam kartu memiliki transisi lambat saat hover.