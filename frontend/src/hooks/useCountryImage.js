import { useEffect, useState } from "react";

const CACHE_PREFIX = "visapacks:unsplash:";
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days - avoids re-fetching on every visit
const UTM = "utm_source=visapacks&utm_medium=referral";

function readCache(slug) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + slug);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.cachedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    // Private browsing, storage disabled, corrupted entry, etc. - just skip the cache.
    return null;
  }
}

function writeCache(slug, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + slug, JSON.stringify({ ...data, cachedAt: Date.now() }));
  } catch {
    // Storage full or unavailable - not worth failing the image over.
  }
}

// Fetches (and caches, per browser) a representative destination photo for a
// country from Unsplash. Requires VITE_UNSPLASH_ACCESS_KEY to be set; without
// it - or if the request fails for any reason (rate limit, network, etc.) -
// resolves to status "unavailable" so callers can render without an image
// rather than showing a broken one.
export function useCountryImage(slug, query) {
  const [image, setImage] = useState(() => readCache(slug));
  const [status, setStatus] = useState(image ? "ready" : "loading");

  useEffect(() => {
    if (image) return;

    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      setStatus("unavailable");
      return;
    }

    let cancelled = false;

    fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Unsplash request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const photo = data.results?.[0];
        if (!photo) throw new Error("No Unsplash results for query");

        const result = {
          url: `${photo.urls.raw}&w=1600&q=80&auto=format&fit=crop`,
          thumbUrl: `${photo.urls.raw}&w=640&q=80&auto=format&fit=crop`,
          altDescription: photo.alt_description || query,
          photographerName: photo.user.name,
          photographerLink: `${photo.user.links.html}?${UTM}`,
        };

        if (!cancelled) {
          writeCache(slug, result);
          setImage(result);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });

    return () => {
      cancelled = true;
    };
  }, [slug, query, image]);

  return { image, status };
}

export const UNSPLASH_UTM = UTM;
