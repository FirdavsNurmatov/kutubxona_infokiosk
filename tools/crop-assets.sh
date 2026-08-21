#!/bin/bash
# Maketlardan interfeys aktivlarini kesib, webp ga o'giradi.
# Ishlatish: ./crop-assets.sh   (loyiha ildizidan)
set -e
SRC=kutubxona_rasmlar_interfeysi_1
OUT=public/interface

# cut <mockup> <modul>/<nom> <WxH+X+Y> [scale%]
cut() {
  local src="$SRC/$1.png" dest="$OUT/$2.webp" geom="$3" scale="${4:-100}"
  mkdir -p "$(dirname "$dest")"
  if [ "$scale" = "100" ]; then
    convert "$src" -crop "$geom" +repage -quality 88 -define webp:method=6 "$dest"
  else
    convert "$src" -crop "$geom" +repage \
      -filter Lanczos -resize "$scale%" -unsharp 0x0.6+0.7+0.02 \
      -quality 88 -define webp:method=6 "$dest"
  fi
}

# ══ HUB (navigasiya) ═════════════════════════════════
cut navigasiya hub/hero            596x300+320+255  160
cut navigasiya hub/zallar          176x150+272+678  190
cut navigasiya hub/xizmatlar       188x155+480+675  190
cut navigasiya hub/qavatlar        185x155+695+675  190
cut navigasiya hub/event-1         110x92+48+1300   220
cut navigasiya hub/event-2         110x92+333+1300  220
cut navigasiya hub/event-3         110x92+608+1300  220

# ══ ALLOMALAR ════════════════════════════════════════
cut buyuk_allomalar allomalar/ornament-left   225x440+0+200    150
cut buyuk_allomalar allomalar/ornament-right  226x460+690+180  150
cut buyuk_allomalar allomalar/p-xorazmiy      144x144+71+668   200
cut buyuk_allomalar allomalar/p-beruniy       144x144+226+668  200
cut buyuk_allomalar allomalar/p-ibnsino       144x144+382+668  200
cut buyuk_allomalar allomalar/p-ulugbek       144x144+537+668  200
cut buyuk_allomalar allomalar/p-fargoniy      144x144+693+668  200
cut buyuk_allomalar allomalar/featured        500x375+380+1157 170

# ══ SIYMOLAR (100 siymo) ═════════════════════════════
cut 100tasiymooq siymolar/hero          800x230+100+140  150
cut 100tasiymooq siymolar/cat-olimlar   210x120+30+732   190
cut 100tasiymooq siymolar/cat-adiblar   210x120+254+732   190
cut 100tasiymooq siymolar/cat-sanat   210x120+478+732   190
cut 100tasiymooq siymolar/cat-bastakor   210x120+702+732   190
cut 100tasiymooq siymolar/cat-memor   210x120+30+937   190
cut 100tasiymooq siymolar/cat-sport   210x120+254+937   190
cut 100tasiymooq siymolar/cat-boshqa   210x120+478+937   190
cut 100tasiymooq siymolar/featured      355x282+45+1166  170
cut 100tasiymooq siymolar/quote-bg      320x130+0+1468   130

# ══ MEROS (nodir meros) ══════════════════════════════
cut nodir_meros meros/hero-book     840x285+40+625   150
cut nodir_meros meros/boburnoma     280x330+62+1160  180
cut nodir_meros meros/page-left     100x230+0+80     180
cut nodir_meros meros/page-right    126x230+790+80   180

# ══ TARIX ════════════════════════════════════════════
cut ozbekiston_tarixi tarix/hero        385x212+485+600  200
cut ozbekiston_tarixi tarix/era-1       90x90+119+478    220
cut ozbekiston_tarixi tarix/era-2       90x90+119+573    220
cut ozbekiston_tarixi tarix/era-3       90x90+119+667    220
cut ozbekiston_tarixi tarix/era-4       90x90+119+762    220
cut ozbekiston_tarixi tarix/era-5       90x90+119+857    220
cut ozbekiston_tarixi tarix/era-6       90x90+119+951    220
cut ozbekiston_tarixi tarix/era-7       90x90+119+1046   220
cut ozbekiston_tarixi tarix/map         600x180+290+1168 170
cut ozbekiston_tarixi tarix/event-1     142x90+66+1402   200
cut ozbekiston_tarixi tarix/event-2     143x90+224+1402  200
cut ozbekiston_tarixi tarix/event-3     143x90+382+1402  200
cut ozbekiston_tarixi tarix/event-4     143x90+540+1402  200
cut ozbekiston_tarixi tarix/event-5     142x90+698+1402  200
cut ozbekiston_tarixi tarix/wide-1      320x195+0+185    200
cut ozbekiston_tarixi tarix/wide-2      316x195+600+185  200

# ══ KECHA-BUGUN ══════════════════════════════════════
cut ozbekiston_xozir_va_oldin kechabugun/before   413x457+45+478  170
cut ozbekiston_xozir_va_oldin kechabugun/after    412x457+458+478 170
cut ozbekiston_xozir_va_oldin kechabugun/city-1   157x120+57+1005 220
cut ozbekiston_xozir_va_oldin kechabugun/city-2   150x120+222+1005 220
cut ozbekiston_xozir_va_oldin kechabugun/city-3   141x120+382+1005 220
cut ozbekiston_xozir_va_oldin kechabugun/city-4   162x120+530+1005 220
cut ozbekiston_xozir_va_oldin kechabugun/city-5   160x120+700+1005 220
cut ozbekiston_xozir_va_oldin kechabugun/orn-left  120x210+0+95   150
cut ozbekiston_xozir_va_oldin kechabugun/orn-right 116x210+800+95 150

# ══ VIKTORINA ════════════════════════════════════════
cut bilimingizni_sinang viktorina/hero      456x490+460+150  160
cut bilimingizni_sinang viktorina/featured  385x255+62+1315  180

# ══ BOLALAR ══════════════════════════════════════════
cut bilimingizni_sinang_baby bolalar/hero      544x480+480+110 140
cut bilimingizni_sinang_baby bolalar/topic-1   145x150+46+640 190
cut bilimingizni_sinang_baby bolalar/topic-2   145x150+220+640 190
cut bilimingizni_sinang_baby bolalar/topic-3   145x150+380+640 190
cut bilimingizni_sinang_baby bolalar/topic-4   145x150+540+640 190
cut bilimingizni_sinang_baby bolalar/topic-5   145x150+693+640 190
cut bilimingizni_sinang_baby bolalar/topic-6   145x150+853+640 190
cut bilimingizni_sinang_baby bolalar/game-1    160x115+40+1212 190
cut bilimingizni_sinang_baby bolalar/game-2    165x115+230+1212 190
cut bilimingizni_sinang_baby bolalar/game-3    165x115+425+1212 190
cut bilimingizni_sinang_baby bolalar/game-4    165x115+620+1212 190
cut bilimingizni_sinang_baby bolalar/game-5    165x115+813+1212 190
cut bilimingizni_sinang_baby bolalar/badge     105x92+42+998   210
cut bilimingizni_sinang_baby bolalar/gift      125x95+852+996  210
cut bilimingizni_sinang_baby bolalar/trophy    88x88+542+1000  210

echo "── tayyor ──"
du -sh $OUT; find $OUT -name '*.webp' | wc -l
