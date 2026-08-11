import { useState } from "react";

import { countryImageQueries } from "../data/countryImageQueries.js";
import { UNSPLASH_UTM, useCountryImage } from "../hooks/useCountryImage.js";

// Renders nothing (not a broken-image placeholder) when there's no
// VITE_UNSPLASH_ACCESS_KEY configured or the fetch failed - the flag +
// name/summary already carry the card on their own, so a missing photo
// degrades gracefully rather than leaving a visible gap.
//
// variant="banner" (CountryDetail) gets Unsplash's full required
// attribution as real hyperlinks. variant="card" (the homepage grid) is
// nested inside that country's <Link>, and a hyperlink can't nest inside
// another one (invalid HTML, unpredictable DOM), so it gets a plain-text
// credit instead - full attribution is one click away on the detail page.
export default function CountryImage({ country, variant = "card" }) {
  const query = countryImageQueries[country.slug] ?? `${country.name} landmark skyline`;
  const { image, status } = useCountryImage(country.slug, query);
  const [loaded, setLoaded] = useState(false);

  if (status !== "ready") return null;

  const isBanner = variant === "banner";

  return (
    <div
      className={`group relative overflow-hidden border-hairline ${
        isBanner ? "aspect-[21/9] border shadow-card" : "aspect-[4/3] border-b"
      }`}
    >
      <img
        src={isBanner ? image.url : image.thumbUrl}
        alt={image.altDescription}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`img-fade-in${loaded ? " is-loaded" : ""} h-full w-full object-cover group-hover:scale-105`}
      />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
      {isBanner ? (
        <p className="absolute bottom-2 right-3 text-xs text-white">
          Photo by{" "}
          <a
            href={image.photographerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            {image.photographerName}
          </a>{" "}
          on{" "}
          <a
            href={`https://unsplash.com/?${UNSPLASH_UTM}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Unsplash
          </a>
        </p>
      ) : (
        <span className="absolute bottom-1 right-1.5 text-[10px] text-white">
          {image.photographerName} / Unsplash
        </span>
      )}
    </div>
  );
}
