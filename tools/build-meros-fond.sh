#!/bin/bash
# "Nodir meros" fondining varaqlarini tayyorlaydi.
#
# Manba: fond-originals/Nodir Meros/ (git'ga kirmaydi) — har bir nashr uchun
# skaner PDF, ba'zilarida tayyor muqova PNG'i.
# Natija: public/interface/meros/fond/<id>/{cover,p01…}.webp
#
# Talab: poppler-utils (pdftoppm) va ImageMagick (convert).
set -e
P="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$P/fond-originals/Nodir Meros"
OUT="$P/public/interface/meros/fond"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# id|pdf (SRC ichidagi yo'l, .pdf'siz)|muqova manbai|varaqlar
# muqova: png:<fayl> — tayyor muqova; page:<n> — shu varaqning o'zi
# varaqlar: 1-N oralig'i yoki bo'sh varaqlar tashlab yuborilgan aniq ro'yxat
ITEMS=(
"mahbub-ul-qulub|Qo'lyozmalar/Пв_233|png:Qo'lyozmalar/Пв_233.png|1-14"
"muqaddimat-al-adab|Qo'lyozmalar/Пв_56|png:Qo'lyozmalar/Пв_56.png|1-14"
"silsilat-az-zahab|Qo'lyozmalar/Пв_61|png:Qo'lyozmalar/Пв_61.png|1-14"
"sharh-al-mulaxxas|Qo'lyozmalar/Пв_71|png:Qo'lyozmalar/Пв_71.png|1-14"
"zafarnoma-1723|Nodir kitoblar/Пи-2500_I|png:Nodir kitoblar/Пи-2500_I.png|1-14"
"temur-tuzuklari-1783|Nodir kitoblar/Пи-2806_Temur tuzuklari|png:Nodir kitoblar/Пи-2806_Temur tuzuklari.png|1-14"
"humoyunnoma-1959|Nodir kitoblar/Пя-10232_Гулбаданбегим|png:Nodir kitoblar/Пя-10232_Гулбаданбегим.png|1-14"
"boburnoma|Nodir kitoblar/Пя-11672 -I_Bobur|png:Nodir kitoblar/Пя-11672 -I_Bobur.png|1-14"
"atlas-xvii|Tarixiy meros/ATLAS|page:3|1-14"
"lugat-turk-fransuz|Tarixiy meros/O-Fc-6|page:6|1-14"
"oyina-1913|Tarixiy meros/oyna_1913_001|page:1|1-14"
"kengash-1917|Tarixiy meros/Пяу-227_Кенгаш (1917)|page:2|1 5 6 7 8 9 10 11 12 16"
)

pages_of() { # "1-14" yoki "1 5 6 …"
  if [[ $1 == *-* ]]; then seq "${1%-*}" "${1#*-}"; else echo "$1"; fi
}

page_webp() { # pdf, varaq raqami, natija
  pdftoppm -scale-to 1800 -f "$2" -l "$2" -png "$1" "$TMP/x" 2>/dev/null
  convert "$TMP"/x-*.png -quality 78 -define webp:method=5 "$3"
  rm -f "$TMP"/x-*.png
}

build() { # id, pdf, muqova, varaqlar
  local id=$1 pdf=$2 cover=$3 list=$4 i=0 idx
  echo ">> $id"
  mkdir -p "$OUT/$id"; rm -f "$OUT/$id"/*.webp
  for pg in $(pages_of "$list"); do
    i=$((i+1)); printf -v idx "%02d" $i
    page_webp "$SRC/$pdf.pdf" "$pg" "$OUT/$id/p$idx.webp"
  done
  if [[ $cover == png:* ]]; then
    convert "$SRC/${cover#png:}" -resize 720x1080\> -quality 80 "$OUT/$id/cover.webp"
  else
    printf -v idx "%02d" "${cover#page:}"
    convert "$OUT/$id/p$idx.webp" -resize 720x1080\> -quality 80 "$OUT/$id/cover.webp"
  fi
}

for it in "${ITEMS[@]}"; do
  IFS='|' read -r id pdf cover list <<< "$it"
  build "$id" "$pdf" "$cover" "$list"
done

# Turkiston albomi — ikki jild ketma-ket, muqova sifatida fotovaraq olinadi.
id=turkiston-albomi
echo ">> $id"
mkdir -p "$OUT/$id"; rm -f "$OUT/$id"/*.webp
i=0
for vol in ALBOM1 ALBOM2; do
  for pg in $(seq 1 8); do
    i=$((i+1)); printf -v idx "%02d" $i
    page_webp "$SRC/Tarixiy meros/$vol.pdf" "$pg" "$OUT/$id/p$idx.webp"
  done
done
convert "$OUT/$id/p04.webp" -resize 720x1080\> -quality 80 "$OUT/$id/cover.webp"

echo "Tayyor: $OUT"
