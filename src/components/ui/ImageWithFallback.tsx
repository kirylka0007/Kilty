"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type ImageWithFallbackProps = Omit<ImageProps, "onError">;

export default function ImageWithFallback(props: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-charcoal text-grey-mid ${props.className ?? ""}`}
        style={{ width: "100%", aspectRatio: `${props.width}/${props.height}` }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return <Image {...props} onError={() => setError(true)} />;
}
