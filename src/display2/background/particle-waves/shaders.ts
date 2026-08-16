/**
 * Particle Waves shader'lari.
 *
 * Asos — OpenBackgrounds `ParticleWaves.vue` (MIT):
 * https://github.com/osamatech786/openbackgrounds
 *
 * Kutubxona ekrani uchun ikkita o'zgarish kiritilgan:
 *
 * 1. `u_calm` — markazni tinchlantirish. Ekranning o'rtasida kitob va tadbir
 *    karusellari turadi, shuning uchun to'lqin amplitudasi va zarrachalar
 *    yorqinligi markazga yaqinlashgan sari kamayadi. Zarrachalar butunlay
 *    yo'qolmaydi — faqat sokinlashadi.
 * 2. `u_intensity` — bo'lim (INTRO/KITOBLAR/TADBIRLAR/AMBIENT) o'z yorqinligini
 *    boshqarishi uchun umumiy kuchaytirgich.
 *
 * To'lqin chastotasi ham pasaytirilgan (6π → 3π/4π): mayda titrash o'rniga
 * keng va sekin oqim hosil bo'ladi.
 */

export const VERTEX_SHADER = `
  #define M_PI 3.1415926535897932384626433832795

  attribute vec3 a_position;
  attribute vec4 a_color;

  uniform float u_time;
  uniform float u_speed;
  uniform float u_size;
  uniform vec3 u_field;
  uniform mat4 u_projection;
  uniform float u_calm;
  uniform float u_intensity;
  uniform float u_horizon;

  varying vec4 v_color;

  void main() {
    vec3 pos = a_position;

    // 0 — kadr markazi, 1 — chap/o'ng chekka
    float edge = clamp(abs(pos.x) / (u_field.x * 0.5), 0.0, 1.0);
    float openness = smoothstep(0.10, 0.72, edge);

    // Markazda to'lqin pasayadi, chetlarda to'liq kuchida qoladi
    float calmWave = mix(1.0 - u_calm, 1.0, openness);

    float waveX = cos((pos.x / u_field.x) * M_PI * 3.0 + u_time * u_speed);
    float waveZ = sin((pos.z / u_field.z) * M_PI * 4.0 + u_time * u_speed * 0.75);
    pos.y += (waveX + waveZ) * u_field.y * calmWave;

    gl_Position = u_projection * vec4(pos, 1.0);

    /* Yaqin qatordagi nuqtalar ulkan disklarga aylanib, additive
       aralashuvda kadrni oqartirib yubormasligi kerak — chegara qat'iy. */
    float perspectiveSize = u_size / max(gl_Position.w, 0.25);
    gl_PointSize = clamp(perspectiveSize, 1.5, 26.0);

    // Markazdagi zarrachalar so'nadi, lekin yo'qolmaydi
    float calmAlpha = mix(1.0 - u_calm * 0.72, 1.0, openness);

    /* Gorizont: kadrning yuqori qismi toza qolishi kerak. To'lqin me'moriy
       yer sathi bo'ylab oqadi, osmonga ko'tarilmaydi — shuning uchun ekranda
       yuqoriroq proyeksiyalangan nuqtalar so'nib boradi. */
    float ndcY = gl_Position.y / max(gl_Position.w, 0.001);
    float horizonFade = 1.0 - smoothstep(u_horizon, u_horizon + 0.75, ndcY);

    v_color = vec4(a_color.rgb, a_color.a * calmAlpha * horizonFade * u_intensity);
  }
`;

export const FRAGMENT_SHADER = `
  precision mediump float;

  varying vec4 v_color;
  uniform float u_glow;

  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float dist = dot(uv, uv);
    if (dist > 1.0) {
      discard;
    }

    float falloff = pow(1.0 - clamp(dist, 0.0, 1.0), 2.3);
    vec3 color = v_color.rgb * (1.0 + falloff * u_glow);
    float alpha = falloff * v_color.a;

    gl_FragColor = vec4(color, alpha);
  }
`;
