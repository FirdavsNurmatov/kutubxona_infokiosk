/**
 * INTRO va AMBIENT sahnalarining hero manbasi.
 *
 * Ikkala sahna ham xuddi shu kompozitsiyani ikki xil yo'l bilan chiza oladi:
 *
 *   • `null`   — statik rasm + CSS/canvas qatlamlari (deraza chiroqlari,
 *                tuman, nur dastasi, aks). Ular desinxron ritmlarda ishlaydi
 *                va **hech qachon takrorlanmaydi**;
 *   • video    — Higgsfield'da shu rasmdan generatsiya qilingan loop video.
 *                Har kadri boyroq, lekin ~8.6 sekundda bir marta takrorlanadi.
 *
 * Video yoqilganda uning ichiga allaqachon "pishirilgan" qatlamlar (chiroq
 * titrashi, tuman, nur, yog'du) CSS'da qayta chizilmaydi — aks holda ikki
 * qavat bo'lib, sun'iy ko'rinadi. Zarrachalar canvas'i esa qoladi: u
 * takrorlanmaydigan qatlam sifatida videoning davriyligini yashiradi.
 *
 * Statik variantga qaytish uchun qiymatni `null` qilish kifoya.
 */
export const HERO_VIDEO = {
  intro: '/videos/intro-building.mp4' as string | null,
  books: '/videos/books-stage.mp4' as string | null,
  /*
     TADBIRLAR: "oldinga-orqaga" loop. Generatsiya qilingan klipning oxiri
     boshiga to'liq tutashmagani uchun ekranda har 10 sekundda sakrash
     ko'rinardi. Yechim — klipning o'zi va uning teskari nusxasi ketma-ket
     ulangan: 0→10s oldinga, so'ng 10→0s orqaga. Bunda ikkala chok ham aynan
     bir xil kadrga tushadi, shuning uchun aylanish butunlay bilinmaydi.
     Fayl `events-hall.mp4` + `events-hall-reversed.mp4` dan qayta
     kodlanmasdan (`-c copy`) yig'ilgan — sifat manba bilan bir xil.
  */
  events: '/videos/events-hall-loop.mp4' as string | null,
  ambient: '/videos/ambient-book.mp4' as string | null,
};
