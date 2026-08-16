/**
 * Ikkita hero sahnaning GSAP boshqaruvi.
 *
 * Asosiy tamoyil: **hech bir animatsiya ikkinchisi bilan sinxron emas.**
 * Har bir qatlam o'z davriga va tasodifiy kechikishiga ega, shuning uchun
 * tomoshabin "animatsiya boshlandi va tugadi" degan hissiyotni sezmaydi —
 * muhit shunchaki tirikdek tuyuladi.
 *
 *   deraza chiroqlari  4–10 s (tasodifiy)
 *   tuman              20–40 s
 *   nur dastasi        3–5 s ochiladi, keyin 6–14 s tanaffus
 *   chang              3–12 s (har zarracha o'z umri bilan)
 *   kitob nuri         6–10 s
 *   varaq yorug'ligi   14–22 s
 *   to'lqinlar         uzluksiz sekin oqim
 *   chaqnashlar        5–15 s (tasodifiy)
 *   harflar            8–16 s
 *
 * Har ikki fabrika `destroy()` qaytaradi: sahifa yopilganda timeline'lar,
 * ticker va canvas resurslari to'liq bo'shatiladi.
 */

import { gsap } from "gsap";
import { createScene } from "./scene";
import { createDustField } from "./dust";

export interface SceneController {
  destroy(): void;
}

const random = gsap.utils.random;

/* ══ INTRO — kutubxona me'morchiligi ════════════════════════ */

export interface IntroRefs {
  root: HTMLElement;
  /**
   * Butun ekranni egallagan bino tasviri. Video rejimida yo'q: kadr
   * harakati videoning o'zida, ustidan yana siljitish kerak emas.
   */
  plate?: HTMLElement | null;
  /** Deraza chiroqlarining guruhlari (chap qanot, markaz, o'ng qanot). */
  windowGroups?: HTMLElement[] | null;
  hazeFar?: HTMLElement | null;
  hazeNear?: HTMLElement | null;
  /** Bino markazidan taraladigan oltin nur. */
  rays?: HTMLElement | null;
  /** Bino ostidagi aks. */
  reflection?: HTMLElement | null;
  dustCanvas: HTMLCanvasElement;
}

export function createIntroAnimation(refs: IntroRefs): SceneController {
  const dust = createDustField(refs.dustCanvas);

  const resizeObserver = new ResizeObserver(() => dust.resize());
  resizeObserver.observe(refs.root);

  let tick: ((time: number, deltaTime: number) => void) | null = null;
  const mm = gsap.matchMedia();

  mm.add(
    { animate: "(prefers-reduced-motion: no-preference)" },
    (context) => {
      const { animate } = context.conditions as { animate: boolean };

      if (!animate) {
        dust.renderStill();
        return undefined;
      }

      /* Kadr sezilmas darajada yaqinlashadi (42 s) — tasvir "tirik" tuyuladi,
         lekin harakat ko'zga tashlanmaydi. */
      if (refs.plate) {
        gsap.fromTo(
          refs.plate,
          { scale: 1 },
          {
            scale: 1.03,
            duration: 42,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
        );
      }

      /* Deraza chiroqlari: har guruh o'z ritmida yorishadi va so'nadi.
         `repeatRefresh` har takrorda yangi tasodifiy qiymat beradi, ya'ni
         guruhlar hech qachon bir vaqtda o'zgarmaydi — bu miltillash emas,
         tabiiy me'moriy yoritish. */
      refs.windowGroups?.forEach((group, index) => {
        gsap.to(group, {
          opacity: () => random(0.34, 0.86),
          duration: () => random(4, 10),
          ease: "sine.inOut",
          repeat: -1,
          repeatRefresh: true,
          delay: index * random(0.8, 2.4),
        });
      });

      /* Ikki qavat tuman: uzoqdagisi sekinroq, yaqindagisi qarama-qarshi
         yo'nalishda — natijada chuqurlik hosil bo'ladi. */
      if (refs.hazeFar && refs.hazeNear) {
        gsap.fromTo(
          refs.hazeFar,
          { opacity: 0.22, xPercent: -2 },
          {
            opacity: 0.44,
            xPercent: 2,
            duration: 38,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
        );
        gsap.fromTo(
          refs.hazeNear,
          { opacity: 0.3, xPercent: 1.6 },
          {
            opacity: 0.16,
            xPercent: -1.6,
            duration: 24,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 4,
          },
        );
      }

      /* Me'moriy nur: ochiladi → ushlab turadi → so'nadi → kutadi.
         Tanaffus tasodifiy, shuning uchun takroriylik sezilmaydi. */
      if (refs.rays) {
        gsap
          .timeline({
            repeat: -1,
            repeatRefresh: true,
            repeatDelay: random(6, 14),
            delay: 3,
          })
          .fromTo(
            refs.rays,
            { opacity: 0 },
            {
              opacity: () => random(0.22, 0.46),
              duration: () => random(3, 5),
              ease: "sine.inOut",
            },
          )
          .to(
            refs.rays,
            { opacity: 0, duration: () => random(4, 6), ease: "sine.inOut" },
            "+=3",
          );
      }

      // Poldagi aks — eng sekin qatlam
      if (refs.reflection) {
        gsap.fromTo(
          refs.reflection,
          { opacity: 0.3, scaleX: 1 },
          {
            opacity: 0.62,
            scaleX: 1.04,
            duration: 31,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 6,
          },
        );
      }

      // Changning umumiy zichligi ham sekin nafas oladi
      gsap.to(dust.levels, {
        dust: 0.6,
        duration: 17,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      tick = (_time, deltaTime) => dust.step(deltaTime / 1000);
      gsap.ticker.add(tick);

      return () => {
        if (tick) {
          gsap.ticker.remove(tick);
          tick = null;
        }
      };
    },
    refs.root,
  );

  return {
    destroy() {
      if (tick) gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      mm.revert();
      dust.destroy();
    },
  };
}

/* ══ AMBIENT — ochiq kitob va bilim oqimi ═══════════════════ */

export interface AmbientRefs {
  root: HTMLElement;
  /** Kitob markazidan taralayotgan nur dastasi. Video rejimida yo'q. */
  burst?: HTMLElement | null;
  /** Kitob ustidagi iliq oltin yog'du. Video rejimida yo'q. */
  glow?: HTMLElement | null;
  /** Varaqlar qirrasi bo'ylab suriladigan yorug'lik. Video rejimida yo'q. */
  pageLight?: HTMLElement | null;
  /** Harflar, yorug'lik izlari va uchqunlar chiziladigan canvas. */
  canvas: HTMLCanvasElement;
}

export function createAmbientAnimation(refs: AmbientRefs): SceneController {
  const scene = createScene(refs.canvas);

  const resizeObserver = new ResizeObserver(() => scene.resize());
  resizeObserver.observe(refs.root);

  let tick: ((time: number, deltaTime: number) => void) | null = null;
  const mm = gsap.matchMedia();

  mm.add(
    { animate: "(prefers-reduced-motion: no-preference)" },
    (context) => {
      const { animate } = context.conditions as { animate: boolean };

      if (!animate) {
        scene.renderStill();
        return undefined;
      }

      /* Kamera ataylab qotirilgan: rasm siljimaydi ham, kattalashmaydi ham.
         Quyidagi qatlamlarning davrlari bir-biriga karrali emas — ular
         hech qachon bir vaqtda cho'qqiga chiqmaydi. */

      /* Kitob markazidagi nur: sekin nafas (7.4 s va 9.1 s).
         Video rejimida bu qatlamlar DOM'da yo'q — nur videoning ichida. */
      if (refs.burst) {
        gsap.fromTo(
          refs.burst,
          { opacity: 0.52, scaleY: 0.98 },
          {
            opacity: 0.9,
            scaleY: 1.03,
            duration: 7.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
        );
      }
      if (refs.glow) {
        gsap.fromTo(
          refs.glow,
          { opacity: 0.55, scale: 0.98 },
          {
            opacity: 1,
            scale: 1.05,
            duration: 9.1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.7,
          },
        );
      }

      // Varaqlar bo'ylab suriladigan iliq yorug'lik (18 s, bir yo'nalishda)
      if (refs.pageLight) {
        gsap.fromTo(
          refs.pageLight,
          { xPercent: -34, opacity: 0 },
          {
            xPercent: 34,
            opacity: 0.55,
            duration: 18,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 2.5,
          },
        );
      }

      // Canvas qatlamlarining yorqinligi — uchta har xil davr
      gsap.to(scene.levels, {
        trails: 0.78,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(scene.levels, {
        stars: 0.72,
        duration: 7.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2.1,
      });
      gsap.to(scene.levels, {
        letters: 0.62,
        duration: 13,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3.4,
      });
      gsap.to(scene.levels, {
        sparks: 0.74,
        duration: 8.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });

      // Butun sahna GSAP soatida yuradi — alohida rAF sikli yo'q
      tick = (_time, deltaTime) => scene.step(deltaTime / 1000);
      gsap.ticker.add(tick);

      return () => {
        if (tick) {
          gsap.ticker.remove(tick);
          tick = null;
        }
      };
    },
    refs.root,
  );

  return {
    destroy() {
      if (tick) gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      // revert() matchMedia ichida yaratilgan barcha tween'larni o'ldiradi
      mm.revert();
      scene.destroy();
    },
  };
}
