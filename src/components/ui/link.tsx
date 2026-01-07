/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type PrefetchImage = {
  srcset: string;
  sizes: string;
  src: string;
  alt: string;
  loading: string;
};

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function prefetchImages(href: string) {
//   const url = new URL(href, window.location.href);
//   try {
//     const imageResponse = await fetch(`${url.pathname}`, {
//       priority: "low",
//     });

//     if (!imageResponse.ok && process.env.NODE_ENV === "development") {
//       throw new Error("Failed to prefetch images");
//     }

//     const { images } = await imageResponse.json();
//     return images as PrefetchImage[];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

const seen = new Set<string>();
const imageCache = new Map<string, PrefetchImage[]>();

type CustomLinkProps = LinkProps & { onHover?: () => void; children?: React.ReactNode };

export const Link = ({ children, onHover, ...props }: CustomLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const href = `/kh${String(props.href)}`;
  // let prefetchTimeout: NodeJS.Timeout | null = null;

  // useEffect(() => {
  //   if (props.prefetch === false) return;

  //   const linkElement = linkRef.current;
  //   if (!linkElement) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const entry = entries[0];
  //       if (entry.isIntersecting) {
  //         prefetchTimeout = setTimeout(async () => {
  //           router.prefetch(href);
  //           await sleep(0);

  //           if (!imageCache.has(href)) {
  //             prefetchImages(href).then((images) => {
  //               imageCache.set(href, images);
  //             }).catch(console.error);
  //           }

  //           observer.unobserve(entry.target);
  //         }, 300);
  //       } else if (prefetchTimeout) {
  //         clearTimeout(prefetchTimeout);
  //         prefetchTimeout = null;
  //       }
  //     },
  //     { rootMargin: "0px", threshold: 0.1 }
  //   );

  //   observer.observe(linkElement);

  //   return () => {
  //     observer.disconnect();
  //     if (prefetchTimeout) {
  //       clearTimeout(prefetchTimeout);
  //     }
  //   };
  // }, [href, props.prefetch]);

  return (
    <NextLink
      ref={linkRef}
      prefetch={false}
      href={href}
      onMouseEnter={() => {
        router.prefetch(href);
        // onHover?.()
        const images = imageCache.get(href) || [];
        for (const image of images) {
          prefetchImage(image);
        }
      }}
      onMouseDown={(e) => {
        if (
          e.button === 0 &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey
        ) {
          e.preventDefault();
          router.push(href);
        }
      }}
    >
      {children}
    </NextLink>
  );
};

function prefetchImage(image: PrefetchImage) {
  if (
    // image.loading === "lazy" ||
    seen.has(image.srcset)
  ) {
    return;
  }
  const img = new Image();
  img.decoding = "async";
  img.fetchPriority = "low";
  img.sizes = image.sizes;
  seen.add(image.srcset);
  img.srcset = image.srcset;
  img.src = image.src;
  img.alt = image.alt;
}
