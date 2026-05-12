# AI-фото для лендинга /cottage

10 промптов для Nano Banana Pro (Google Gemini Image) или GPT Image 2 (OpenAI):
5 «классических» (hero, comparison, facade, cta-bg, og) + 5 «морф-слоёв» (см. §6–§10).
Все фото — в едином стиле: тёплая цветовая температура (4500–5500K), плёночное зерно,
архитектурная фотография в стиле Architectural Digest.

## Общие правила (вшивать в каждый промпт)

- Photography style: editorial architectural photography, AD magazine, Iwan Baan school
- Lighting: golden hour or overcast natural light, soft shadows, no harsh sun
- Camera: full-frame, 35mm or 50mm, slight grain, ISO 400 look
- Mood: serious, premium, restrained, no flashy artifacts
- Negative: no purple gradients, no AI-glow, no over-saturation, no fish-eye, no fake people, no text overlays, no logos, no toy-like aesthetics

## 1. Hero (16:9, 1920×1080)

> Premium two-story modern cottage, 280 m², monolithic concrete structure with warm wood cladding accents on facade, large floor-to-ceiling windows, exposed structural details, set on Ural region landscape (pine forest in background, slight mist), golden hour lighting, low-angle wide shot, architectural photography in style of Iwan Baan / AD magazine, restrained color palette of warm grays, charcoal, oak wood, slight 35mm grain, photorealistic, no people, no logos.

**Назначение:** правая колонка hero-секции.
**Файл:** `public/cottage/hero.webp` + `hero@2x.webp`

## 2. Сравнение «коттедж» (1:1, 1200×1200)

> Close-up of a monolithic concrete cottage under construction, exposed reinforcement bars (rebar) and yellow formwork (opalubka), construction details with industrial precision, similar visual language to commercial concrete construction, captured during golden hour, slight overcast, photographic realism, no workers visible, no AI artifacts, restrained palette of concrete gray + safety yellow + steel rust accents.

**Назначение:** правая карточка в секции 02 «ТЦ ↔ дом».
**Файл:** `public/cottage/comparison-cottage.webp`

## 3. Премиум-фасад (4:5, 1200×1500)

> Detail shot of a premium ventilated facade panel, mix of warm wood slats and matte dark grey composite panels, sharp shadow lines, late afternoon side light revealing texture, architectural photography style, slight grain, no logos, no people, restrained warm color palette.

**Назначение:** декоративная вставка в секции 05 «Принципы» (если потребуется доп. визуал).
**Файл:** `public/cottage/principle-facade.webp`

## 4. CTA фон (16:9, 1920×1080, очень тёмный)

> Silhouette of a modern two-story cottage at deep dusk, only outlines visible, monochrome blue-black palette, no warm lights inside, gritty cinematic atmosphere, fog, slight grain, architectural shot style, no logos, no people, very dark — image will be overlaid with text and yellow grid.

**Назначение:** фон финальной секции 11 (полупрозрачный overlay).
**Файл:** `public/cottage/cta-bg.webp`

## 5. OG-картинка (1200×630)

> Wide architectural editorial shot of a premium concrete-and-wood cottage exterior, golden hour, two-story, set in Ural pine forest, restrained warm color palette, focus on materials and structure, AD magazine photography, no logos, no people, slight grain. Text-safe zones: left third for headline overlay, right third for image focus.

**Назначение:** Open Graph для соцсетей и поиска.
**Файл:** `public/cottage/og.jpg` (jpg для совместимости с парсерами)

## Морф-слои Hero (Hero «Чертёж морфит в фото»)

Hero-секция /cottage реализована как scroll-driven морф: чертёж SVG → бетон → дерево →
окна+свет → атмосфера → финальное фото. Слой 1 — это SVG-чертёж (рисуется в коде,
не фото). Слои 2–6 ждут AI-фото; пока используются градиентные плейсхолдеры.

Общие требования к слоям морфа:

- Соотношение сторон: 16:9 (1920×1080), один масштаб для всей цепочки.
- Композиция и точка взгляда **должны совпадать** во всех 5 фото: одна и та же
  «виртуальная камера» смотрит на коттедж — иначе морф будет рваный.
- Палитра: тёплые серые, охра, угольный. Без фиолетового, без неона.
- Без людей, без логотипов, без надписей.

### 6. Морф · слой «Бетон close-up» (16:9, 1920×1080)

> Extreme close-up of poured monolithic concrete wall surface, dark charcoal grey
> (#3a3a38) gradient to near-black (#1a1a18), visible aggregate texture, faint
> formwork tie-rod marks, soft directional light from upper-left, slight 35mm
> film grain, no people, no logos, restrained matte finish, photographic
> realism, industrial precision aesthetic.

**Назначение:** слой 2 hero-морфа (scroll-progress 0.15–0.35).
**Файл:** `public/cottage/morph-concrete.webp`

### 7. Морф · слой «Дерево / фасадные ламели» (16:9, 1920×1080)

> Architectural close-up of vertical thermo-pine facade slats (rhombus cladding),
> warm oak-honey tones (#8b5e3c → #4a2f1c gradient diagonal), late-afternoon
> side light revealing wood grain and shadow gaps between slats, slight overcast
> diffusion, no people, no logos, no glossy varnish, matte oil finish, 35mm grain.
> Frame composition identical to layer 6 (Hero final) — same camera angle.

**Назначение:** слой 3 hero-морфа (scroll-progress 0.35–0.55).
**Файл:** `public/cottage/morph-wood.webp`

### 8. Морф · слой «Окна и свет» (16:9, 1920×1080)

> Two-story modern cottage at dusk, large floor-to-ceiling windows glowing warm
> golden from inside (color temperature 2700K, RGB approx 255-212-90), warm
> interior light spilling onto wood facade and concrete, sky just-after-sunset
> deep teal, no direct sun, contrast between cold exterior and warm interior,
> architectural photography, 35mm, slight grain, no people visible inside
> (or barely a silhouette), no logos. Same camera framing as Hero final shot.

**Назначение:** слой 4 hero-морфа (scroll-progress 0.55–0.75).
**Файл:** `public/cottage/morph-windows.webp`

### 9. Морф · слой «Атмосфера / туман» (16:9, 1920×1080)

> Same cottage exterior shrouded in low evening fog drifting across pine forest
> background, warm-to-cool gradient (foreground warm ochre, background cool
> charcoal), thick 35mm film grain, cinematic atmosphere reminiscent of
> Tarkovsky / Roger Deakins, no people, no logos, restrained mood, slightly
> desaturated. Same camera framing as previous layers.

**Назначение:** слой 5 hero-морфа (scroll-progress 0.60–0.85).
**Файл:** `public/cottage/morph-atmosphere.webp`

### 10. Морф · слой «Финал» (16:9, 1920×1080)

> Premium two-story modern cottage 280 m², monolithic concrete structure with
> warm thermo-pine cladding accents and floor-to-ceiling windows glowing warm
> at golden hour, Ural pine forest background with slight evening mist, low
> wide-angle architectural shot in the style of Iwan Baan / AD magazine,
> restrained palette (warm greys, charcoal, oak), 35mm grain, photorealistic,
> no people, no logos. **This is the canonical Hero shot — all morph layers
> 6–9 must share the same framing, lens, and horizon line as this image.**

**Назначение:** слой 6 hero-морфа (финал, scroll-progress 0.75–1.00) — он же
основной hero. Дублирует §1 по содержанию, но снимать нужно ОДИН раз и
переиспользовать в обоих местах.
**Файл:** `public/cottage/hero.webp` (можно симлинк `morph-final.webp` → `hero.webp`).

### Workflow для морф-слоёв

1. Сгенерируй §10 (финал) первым — это «якорь» композиции.
2. В Nano Banana Pro используй фичу **«img-to-img / edit»**: подаёшь финальный
   кадр + инструкцию «сохрани композицию, замени материалы на бетон close-up» —
   так все 5 слоёв получаются геометрически совместимы.
3. Если img-to-img недоступен — явно прописывай в промпте каждого слоя «same
   camera angle as reference image attached».
4. Все 5 фото складывай в `public/cottage/morph-*.webp` (одно разрешение, один
   webp-quality, чтобы морф визуально работал без скачков).
5. После генерации в `src/app/cottage/components/Hero.tsx` замени градиенты-
   плейсхолдеры в слоях на `<Image fill priority={false} src="..." />`
   (см. TODO-комментарии в коде).

## Workflow

1. Скопируй промпт в Nano Banana Pro или GPT Image 2.
2. Сгенерируй 4–6 вариантов на каждый промпт.
3. Выбери лучший. Не нравится — итерируй промпт (поправь палитру, ракурс).
4. Скачай в максимальном разрешении.
5. Сохрани в `public/cottage/<имя>.webp` (для webp используй `cwebp` или онлайн-конвертер).
6. Размер: hero ≤ 600 KB, comparison ≤ 400 KB, OG ≤ 200 KB.
7. Альт-текст для каждого: см. компоненты (свойство `alt` на `<Image>`).

## Что заменить в коде после генерации

| Файл | Что заменить |
| --- | --- |
| `src/app/cottage/components/Hero.tsx` (слой 2) | градиент бетона → `<Image fill src="/cottage/morph-concrete.webp" />` |
| `src/app/cottage/components/Hero.tsx` (слой 3) | градиент дерева → `<Image fill src="/cottage/morph-wood.webp" />` |
| `src/app/cottage/components/Hero.tsx` (слой 4) | плашки «окон» → `<Image fill src="/cottage/morph-windows.webp" />` |
| `src/app/cottage/components/Hero.tsx` (слой 5) | градиент атмосферы → `<Image fill src="/cottage/morph-atmosphere.webp" />` |
| `src/app/cottage/components/Hero.tsx` (слой 6) | `[ AI HERO PHOTO — final ]` placeholder → `<Image src="/cottage/hero.webp" fill priority />` |
| `src/app/cottage/components/Comparison.tsx` | `[ AI: КОТТЕДЖ · ОПАЛУБКА ]` → `<Image src="/cottage/comparison-cottage.webp" />` + реальное фото колонн ТЦ для левой карточки |
| `src/app/cottage/components/CtaForm.tsx` | Можно добавить фон через CSS `background-image: url(/cottage/cta-bg.webp)` поверх blueprint-grid |
| `src/app/cottage/page.tsx` (metadata) | OG image уже ссылается на `/cottage/og.jpg` |
