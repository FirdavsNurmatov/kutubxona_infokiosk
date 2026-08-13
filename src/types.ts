/** Kiosk ichidagi ekranlar. Router o'rniga oddiy holat (state) ishlatiladi. */
export type View = 'home' | 'catalog' | 'events' | 'about' | 'services' | 'contact' | 'search';

/** Katalog sahifasidagi to'plam filtri. */
export type CollectionFilter = 'all' | 'new' | 'recommended';
