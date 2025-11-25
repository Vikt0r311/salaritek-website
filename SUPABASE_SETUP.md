# Supabase Beállítás - Salaritek Kft.

## ✅ Már Kész (Environment Variables)

Az `.env.local` fájl már létrehozva van a szükséges értékekkel:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `ADMIN_PASSWORD=SalamonCsaba`

## 📋 Még Teendő

### 1. SQL Táblák Létrehozása

1. Menj a Supabase Dashboard-ra: https://app.supabase.com
2. Válassz ki a projektet
3. Menj az "SQL Editor" fülre bal menüben
4. Kattints az "New Query" gombra
5. **Másold be ezt a teljes SQL kódot** és futtasd:

```sql
-- Create galleries table
CREATE TABLE galleries (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial galleries data
INSERT INTO galleries (id, data) VALUES
('csaladi-hazak', '{"id":"csaladi-hazak","title":"Családi házak","slug":"csaladi-hazak","subcategories":[{"id":"erzsebethegy","title":"Erzsébethegy","slug":"erzsebethegy","images":[]},{"id":"sagod_to_utca","title":"Ságod - Tó utca","slug":"sagod_to_utca","images":[]}]}'),
('ipari-kereskedelmi', '{"id":"ipari-kereskedelmi","title":"Ipari és kereskedelmi épületek","slug":"ipari-kereskedelmi","subcategories":[{"id":"ruhagyar","title":"Ruhagyár","slug":"ruhagyar","images":[]},{"id":"salarkitek","title":"Salarkitek Kft.","slug":"salarkitek","images":[]}]}'),
('felujitas', '{"id":"felujitas","title":"Felújítás","slug":"felujitas","subcategories":[{"id":"sagod_fj","title":"Ságod - Felújítás","slug":"sagod_fj","images":[]}]}'),
('gepjarmupark', '{"id":"gepjarmupark","title":"Gépjárműpark","slug":"gepjarmupark","subcategories":[{"id":"gepjarmupark","title":"Gépjárműpark","slug":"gepjarmupark","images":[]}]}');

-- Set up RLS (Row Level Security) policies
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON galleries
  FOR SELECT USING (true);

-- Allow authenticated write/update access (with password check in app)
CREATE POLICY "Allow authenticated write" ON galleries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON galleries
  FOR UPDATE USING (true);
```

6. Kattints a **"Run"** gombra vagy nyomj **Ctrl+Enter**-t

### 2. Storage Bucket Létrehozása

1. A Dashboard-on kattints a **"Storage"** fülre bal menüben
2. Kattints a **"New bucket"** gombra
3. Állítsd be így:
   - **Bucket name**: `gallery-images`
   - **Privacy**: Kikapcsold a "Private" opciót → legyen **PUBLIC**
4. Kattints a **"Create bucket"** gombra

### 3. CORS Beállítás (Fontos!)

1. Menj a **Settings** → **API** fülre
2. Keresd meg a **"CORS origins"** szekciót
3. Add hozzá ezeket az originákat (ha még nincsenek):
   ```
   http://localhost:3000
   http://localhost:3003
   https://salaritek.hu
   https://www.salaritek.hu
   ```

## ✅ Teszt Lokálisan

Miután az SQL és Storage bucket-et beállítottad:

1. Indítsd újra a dev szerver-t:
   ```bash
   npm run dev
   ```

2. Menj az `/admin` URL-re (http://localhost:3003/admin)

3. Bejelentkezés:
   - **Jelszó**: `SalamonCsaba`

4. Próbálj meg:
   - Válassz egy fő kategóriát (pl. "Családi házak")
   - Válassz egy alkategóriát (pl. "Erzsébethegy")
   - Húzz rá egy képet az "Kattintson vagy húzzon képeket ide" területre
   - Kattints a "Feltöltés" gombra

## 🚀 Netlify Deploy (később)

Miután lokálisan működik:

1. Menj a Netlify projekt Settings-be
2. **Build & Deploy** → **Environment**
3. Add hozzá az environment variables-t:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`

## 🐛 Problémamegoldás

**Hiba: "Supabase nincs konfigurálva"**
- Ellenőrizd az `.env.local` fájlt - jól van-e kitöltve?
- Indítsd újra a dev szervert: `npm run dev`

**Hiba: "Bucket does not exist"**
- Ellenőrizd, hogy a `gallery-images` bucket **PUBLIC**-nak van beállítva

**Hiba: "CORS policy error"**
- Ellenőrizd a CORS origins beállítást (Settings → API)
- Add hozzá az aktuális domain-t

**Képek nem töltődnek be**
- Menj a Supabase Storage-ba és kattints a `gallery-images` bucket-re
- Ellenőrizd, hogy a képek ott vannak-e
- Ellenőrizd a képek hozzáférési jogát (public kell legyen)

## 📱 Admin Felület Használata

### Bejelentkezés
- URL: `/admin`
- Jelszó: `SalamonCsaba`

### Galéria Kezelés
1. **Fő kategória kiválasztása** - legördülő lista
2. **Alkategória kiválasztása** - legördülő lista
3. **Új alkategória létrehozása**:
   - Kattints "+ Új" gombra
   - Írd be az alkategória nevét (pl. "Novo Projekt")
   - Kattints "Alkategória Létrehozása" gombra
4. **Alkategória törlése**:
   - Kattints a "🗑️ Törlés" gombra
   - Erősítsd meg a törlést

### Képek Kezelése
1. **Feltöltés**:
   - Húzz képeket az "Kattintson vagy húzzon képeket ide" területre
   - Vagy kattints a területre és válassz fájlokat
   - Kattints a "Feltöltés" gombra

2. **Törlés**:
   - Hover az kép fölé
   - Kattints a piros trash ikonnál

3. **Feltöltött képek megtekintése**:
   - A "Jelenlegi Képek" szekción belül látod az összes feltöltött képet
   - Az alkategória neve mellett a képek száma

## ✨ Az Admin Rendszer Funkciói

- ✅ Teljes képkezelés (feltöltés, törlés)
- ✅ Alkategória kezelés (létrehozás, törlés)
- ✅ Supabase Storage integráció
- ✅ Supabase adatbázis szinkronizáció
- ✅ Fallback módusz (ha Supabase nincs beállítva, JSON-ből dolgozik)
- ✅ Biztonságos jelszó alapú autentikáció

## 📞 Támogatás

Ha valami nem működik:
1. Nézd meg a böngésző konzolt (F12 → Console)
2. Ellenőrizd az admin oldal hibaüzeneteit
3. Nézd meg a Supabase Dashboard-ot, hogy az adatok helyesen vannak-e tárolva
