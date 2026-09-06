const collectionByStorageKey = {
  assga_config: 'config',
  assga_noticias: 'noticias',
  assga_eventos: 'eventos',
  assga_diretoria: 'diretoria',
  assga_estatuto: 'estatuto',
  assga_historia: 'historia',
  assga_slider: 'slider',
};

const apiUrl = (collection) => `/api/data?collection=${encodeURIComponent(collection)}`;
let hydrating = true;

async function hydrateFromApi() {
  await Promise.all(Object.entries(collectionByStorageKey).map(async ([key, collection]) => {
    try {
      const response = await fetch(apiUrl(collection));
      if (!response.ok) return;
      const payload = await response.json();
      if (payload !== null && payload !== undefined && payload.length !== 0) {
        localStorage.setItem(key, JSON.stringify(payload));
      }
    } catch {
      // O cache local continua disponível quando a API estiver indisponível.
    }
  }));
  hydrating = false;
}

const originalSetItem = localStorage.setItem.bind(localStorage);
localStorage.setItem = (key, value) => {
  originalSetItem(key, value);
  const collection = collectionByStorageKey[key];
  if (!collection || hydrating) return;
  fetch(apiUrl(collection), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: value,
  }).catch(() => {});
};

hydrateFromApi();
