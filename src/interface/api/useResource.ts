import { useEffect, useState } from 'react';

/**
 * Promise qaytaruvchi ma'lumot funksiyasini React holatiga bog'laydi.
 *
 * Mock adapter darhol hal bo'ladi, shuning uchun boshlang'ich qiymat
 * kutish holatisiz ham to'g'ri ishlaydi; backend ulanganda esa shu
 * yerning o'zi yuklanish va xato holatini boshqaradi.
 */
export function useResource<T>(load: () => Promise<T>, initial: T): {
  data: T;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    load()
      .then((value) => {
        if (alive) {
          setData(value);
          setError(null);
        }
      })
      .catch((err: Error) => alive && setError(err))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
    // `load` har renderda yangi funksiya bo'lishi mumkin, shuning uchun
    // uni bog'liqlikka qo'shmaymiz — modul o'zi qachon qayta yuklashni biladi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
