# Laman Web Rasmi PANDAI

Laman web **Pertubuhan Amal & Da'wah Anak Istimewa (PANDAI)** — pandai.org.my

## Teknologi

- **Eleventy (11ty)** — static site generator (laju, selamat, percuma)
- **Decap CMS** — admin panel untuk urus berita, galeri & kalendar (`/admin/`)
- **Netlify** — hosting + form handling (free tier)
- **3 bahasa** — BM (utama, `/`), English (`/en/`), Arabic (`/ar/`, RTL)

## Struktur

```
src/
  _data/          → maklumat organisasi (site.js) & terjemahan (i18n/)
  _includes/      → layout & partials (header, footer, widget kebolehcapaian)
  pages/          → 9 halaman utama (auto-jana untuk 3 bahasa)
  berita/ms|en|ar → artikel berita (diurus melalui admin)
  galeri/         → album gambar (diurus melalui admin)
  events/         → kalendar aktiviti (diurus melalui admin)
  uploads/        → gambar yang dimuat naik melalui admin
admin/            → Decap CMS (admin panel)
```

## Cara Run Secara Lokal

```bash
npm install
npm start        # buka http://localhost:8080
npm run build    # jana fail static dalam _site/
```

## Cara Deploy ke Netlify (sekali sahaja)

1. Push folder ini ke GitHub (repo baru, contoh: `pandai-website`)
2. Di [netlify.com](https://netlify.com): **Add new site → Import from GitHub** → pilih repo
   - Build command & publish folder auto-detect dari `netlify.toml`
3. Aktifkan admin panel:
   - Site settings → **Identity** → Enable Identity
   - Identity → Registration → **Invite only**
   - Identity → Services → **Enable Git Gateway**
   - Invite email admin melalui tab Identity
4. Aktifkan borang: Site settings → Forms → Enable (auto-detect borang `hubungi`)
5. Domain: Site settings → Domain management → Add `pandai.org.my`
   (kemas kini DNS di registrar mengikut arahan Netlify)

## Cara Admin Update Kandungan

1. Pergi ke `pandai.org.my/admin/`
2. Log masuk dengan email yang dijemput
3. Pilih koleksi: **Berita** (ikut bahasa), **Galeri**, atau **Kalendar Aktiviti**
4. Tulis → Save → Publish. Website auto-rebuild dalam ~1 minit.

**Penting untuk kebolehcapaian:** setiap gambar WAJIB diisi "keterangan gambar
(alt text)" — terangkan apa yang ada dalam gambar untuk pengguna pembaca skrin.

## Ciri Kebolehcapaian (WCAG 2.1 AA)

- Butang kebolehcapaian (penjuru bawah): saiz teks, kontras tinggi, fon mesra
  disleksia, serlah pautan, panduan bacaan, henti animasi, jarak teks
- Skip link, navigasi papan kekunci penuh, focus indicator jelas
- Kontras warna 4.5:1+ (disahkan), alt text, struktur heading betul
- Sokongan `prefers-reduced-motion`, RTL penuh untuk Arab
- Borang dengan label jelas & mesej ralat

## Nota Penyelenggaraan

- Maklumat organisasi (telefon, alamat, akaun bank): edit `src/_data/site.js`
- Teks halaman statik 3 bahasa: edit `src/_data/i18n/{ms,en,ar}.json`
- Warna & reka bentuk: `src/assets/css/style.css` (pembolehubah di bahagian atas)
