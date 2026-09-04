# Product Requirements Document: Tech Blog

## Product Overview

**Product Vision:** Platform blog artikel teknologi dengan pengalaman baca yang bersih dan minimalis (terinspirasi Medium), memungkinkan pembaca menemukan, menyimpan, dan berdiskusi seputar artikel teknologi, serta memberi penulis ruang untuk mempublikasikan konten dengan mudah.

**Target Users:** Developer, mahasiswa IT, dan praktisi teknologi yang mencari bacaan teknis (tutorial, opini, tips karier) serta ingin berinteraksi lewat like dan komentar.

**Business Objectives:** Membangun komunitas pembaca dan penulis konten teknologi; menjadi referensi bacaan teknis yang terpercaya dan mudah dinavigasi.

**Success Metrics:** Jumlah artikel dipublikasikan, jumlah like & komentar per artikel, retensi pembaca (kunjungan berulang), waktu baca rata-rata per sesi.

## User Personas

### Persona 1: Dina — Pembaca Aktif
- **Demographics:** 24 tahun, frontend developer, terbiasa pakai aplikasi berbasis web/mobile
- **Goals:** Menemukan artikel relevan dengan minatnya (Vue, Nuxt, karier developer), menyimpan artikel untuk dibaca nanti
- **Pain Points:** Sulit menemukan artikel berkualitas di tengah konten yang berantakan; lupa artikel yang pernah dibaca
- **User Journey:** Buka homepage → cari/filter berdasarkan kategori atau kata kunci → baca artikel → like/komentar → simpan ke Library untuk board tertentu

### Persona 2: Budi — Penulis Kontributor
- **Demographics:** 29 tahun, backend engineer, senang berbagi pengalaman lewat tulisan
- **Goals:** Mempublikasikan artikel dengan cepat, melihat respons pembaca (like, komentar)
- **Pain Points:** Proses publikasi yang ribet di platform lain; tidak ada kontrol penuh atas kontennya sendiri
- **User Journey:** Login → tulis/edit artikel → publikasikan → pantau interaksi pembaca → balas/kelola komentar

## Feature Requirements

| Feature | Description | User Stories | Priority | Acceptance Criteria | Dependencies |
|---------|-------------|-------------|----------|---------------------|--------------|
| **Daftar & Detail Artikel** | Menampilkan feed artikel di homepage dan halaman detail lengkap | Sebagai pembaca, saya ingin melihat daftar artikel terbaru dan membuka detailnya | Must | Feed menampilkan judul, penulis, kategori, gambar; detail menampilkan isi lengkap, tag, dan info penulis | Database artikel & relasi penulis |
| **Search Artikel** | Pencarian artikel berdasarkan judul/isi | Sebagai pembaca, saya ingin mencari artikel dengan kata kunci tertentu | Must | Hasil pencarian real-time menyaring feed sesuai kata kunci | Data artikel sudah termuat |
| **Like Artikel** | Pembaca dapat menyukai/batal menyukai artikel | Sebagai pembaca, saya ingin menandai artikel yang saya suka | Must | Jumlah like bertambah/berkurang sesuai aksi; 1 user hanya bisa like 1x per artikel | Sistem identitas user (sementara tanpa login penuh) |
| **Komentar (CRUD)** | Pembaca dapat menambah, mengedit, dan menghapus komentar miliknya | Sebagai pembaca, saya ingin berdiskusi lewat komentar dan mengelola komentar saya sendiri | Must | Komentar baru langsung tampil; edit/hapus hanya berlaku untuk komentar milik sendiri, dengan konfirmasi sebelum hapus | Relasi komentar-user-artikel |
| **Kategori & Tag** | Pengelompokan artikel berdasarkan kategori dan tag topik | Sebagai pembaca, saya ingin menjelajah artikel berdasarkan topik tertentu | Should | Badge kategori/tag tampil di card dan halaman detail | Data kategori & tag di database |
| **Library / Board** | Pembaca dapat menyimpan artikel ke dalam board pribadi | Sebagai pembaca, saya ingin mengelompokkan artikel favorit ke dalam koleksi | Should | Board menampilkan artikel tersimpan sesuai kategori board | Autentikasi user untuk data personal |
| **Trending & Topics Sidebar** | Menampilkan artikel populer dan daftar topik di sidebar | Sebagai pembaca, saya ingin menemukan artikel populer dan topik yang sedang ramai dibahas | Could | Trending diurutkan berdasarkan jumlah like terbanyak | Data like & tag artikel |
| **Layout Responsif** | Tampilan optimal di desktop maupun mobile | Sebagai pembaca, saya ingin mengakses platform dengan nyaman dari perangkat apa pun | Must | Sidebar berubah jadi drawer di mobile; konten tidak terpotong di layar kecil | Desain berbasis Tailwind/Nuxt UI |
| **Autentikasi User** | Login/registrasi untuk membedakan identitas pengguna | Sebagai pengguna, saya ingin aksi like/komentar tercatat sebagai identitas saya sendiri | Should | User dapat login dan aksi (like/komentar) tersimpan sesuai akunnya | Belum diimplementasikan — saat ini masih placeholder ID |

## User Flows

### Flow 1: Membaca dan Menyukai Artikel
1. User membuka homepage, melihat daftar artikel
2. User mengklik salah satu artikel
3. Halaman detail artikel terbuka, menampilkan isi lengkap
   - User dapat menekan tombol like untuk menyukai artikel
   - Jika request like gagal, tampilan like dikembalikan ke kondisi semula

### Flow 2: Menulis Komentar
1. User membuka halaman detail artikel
2. User mengisi form komentar dan menekan tombol kirim
3. Komentar baru tampil di daftar komentar
   - Jika input kosong, tombol kirim tidak aktif
   - Jika request gagal, pesan error ditampilkan tanpa menghapus isi form

### Flow 3: Mengelola Komentar Sendiri
1. User melihat daftar komentar di halaman detail
2. Jika komentar adalah miliknya, tombol Edit/Hapus muncul
3. User menekan Edit → mengubah teks → menyimpan perubahan
   - Jika bukan pemilik komentar, aksi ditolak sistem
4. User menekan Hapus → muncul dialog konfirmasi → user mengonfirmasi → komentar terhapus

## Non-Functional Requirements

### Performance
- **Load Time:** Halaman utama tampil di bawah 2 detik pada koneksi standar
- **Concurrent Users:** Mendukung akses bersamaan skala kecil-menengah (ratusan pengguna aktif)
- **Response Time:** API merespons di bawah 500ms untuk operasi baca data

### Security
- **Authentication:** Direncanakan menggunakan sesi/token untuk identitas user (belum diimplementasikan penuh)
- **Authorization:** Aksi edit/hapus komentar hanya diizinkan untuk pemilik komentar, divalidasi di sisi server
- **Data Protection:** Kredensial dan konfigurasi sensitif disimpan sebagai environment variable, tidak di-commit ke repository

### Compatibility
- **Devices:** Desktop dan mobile
- **Browsers:** Browser modern (Chrome, Firefox, Safari, Edge versi terbaru)
- **Screen Sizes:** Responsif dari lebar mobile (~360px) hingga desktop lebar

### Accessibility
- **Compliance Level:** Mengikuti praktik dasar aksesibilitas (kontras warna, label pada elemen interaktif)
- **Specific Requirements:** Alt text pada gambar artikel, navigasi keyboard pada elemen interaktif utama

## Technical Specifications

### Frontend
- **Technology Stack:** Nuxt.js (Vue 3, SSR), Nuxt UI, shadcn UI (komponen tambahan), TailwindCSS
- **Design System:** Kombinasi komponen Nuxt UI dan shadcn UI dengan gaya minimalis ala Medium
- **Responsive Design:** Mobile-first dengan pola sidebar-drawer untuk navigasi di layar kecil

### Backend
- **Technology Stack:** JavaScript (Nitro sebagai server engine bawaan Nuxt)
- **API Requirements:** RESTful API melalui `server/api/`, response terstandarisasi (`{ success, data }`)
- **Database:** Cloudflare D1 (SQLite) dengan Drizzle ORM untuk skema relasional (users, posts, comments, likes, categories, tags)

### Infrastructure
- **Hosting:** Cloudflare Pages
- **Scaling:** Mengandalkan edge network Cloudflare untuk distribusi global
- **CI/CD:** Deploy otomatis via integrasi Git ke Cloudflare Pages, atau manual via Wrangler CLI

## Analytics & Monitoring

- **Key Metrics:** Jumlah artikel dibaca, like per artikel, komentar per artikel, artikel tersimpan ke board
- **Events:** View artikel, like/unlike, submit komentar, edit/hapus komentar, pencarian
- **Dashboards:** Belum diimplementasikan — direncanakan sebagai pengembangan lanjutan
- **Alerting:** Belum diimplementasikan

## Release Planning

### MVP (v1.0)
- **Features:** Daftar & detail artikel, like, komentar (CRUD), kategori/tag, search, layout responsif
- **Timeline:** Sudah berjalan pada tahap pengembangan aktif
- **Success Criteria:** Seluruh fitur MVP berjalan tanpa bug kritikal, data tersimpan konsisten di database

### Future Releases
- **v1.1:** Autentikasi user penuh (login/register), sistem sesi menggantikan ID placeholder
- **v1.2:** Fitur Library/Board yang tersambung ke akun user (bukan data statis)
- **v2.0:** Dashboard penulis untuk membuat dan mengelola artikel sendiri langsung dari platform

## Open Questions & Assumptions

- **Question 1:** Apakah autentikasi akan dibangun sendiri atau memakai provider pihak ketiga (misal OAuth)?
- **Question 2:** Apakah fitur Board di Library akan mendukung board buatan user sendiri, atau tetap kategori tetap?
- **Assumption 1:** Untuk tahap awal, identitas user masih disimulasikan lewat ID tetap sebelum autentikasi selesai dibangun.
- **Assumption 2:** Volume trafik pada tahap awal masih kecil, sehingga arsitektur serverless (Cloudflare D1 + Nitro) mencukupi tanpa optimasi skala besar.

## Appendix

### Competitive Analysis
- **Medium:** Kuat di sisi pengalaman baca dan tipografi, namun kurang fokus pada niche teknologi spesifik
- **Dev.to:** Fokus komunitas developer, namun tampilan lebih ramai dibanding pendekatan minimalis yang diusung platform ini

### User Research Findings
- Belum ada riset pengguna formal — kebutuhan fitur saat ini disusun berdasarkan observasi kebutuhan dasar platform blog teknologi (baca, like, komentar, simpan).

### AI Conversation Insights
- **Conversation 1:** Proses pengembangan dilakukan secara iteratif bersama AI assistant, mencakup setup frontend Nuxt, migrasi ke Nuxt UI, hingga pembangunan backend Cloudflare D1 + Drizzle ORM.
- **AI-Generated Edge Cases:** Penanganan state kosong (artikel tidak ditemukan, hasil pencarian kosong), validasi kepemilikan komentar sebelum edit/hapus, penanganan optimistic update yang gagal pada fitur like.
- **AI-Suggested Improvements:** Pemisahan tanggung jawab antara frontend (`app/`) dan backend (`server/`), respons API yang konsisten, serta validasi input terstruktur menggunakan schema validation.

### Glossary
- **SSR (Server-Side Rendering):** Teknik rendering halaman di server sebelum dikirim ke browser, meningkatkan SEO dan kecepatan tampil awal.
- **Optimistic Update:** Pola UI yang memperbarui tampilan terlebih dahulu sebelum respons server diterima, untuk kesan interaksi yang instan.
- **Binding:** Mekanisme Cloudflare untuk menghubungkan resource (seperti database D1) ke dalam kode aplikasi.