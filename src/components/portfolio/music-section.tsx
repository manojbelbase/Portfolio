"use client";

import { useEffect, useRef } from "react";
import { spotifyTrackUri } from "@/data/portfolio-data";
import SectionHeading from "./section-heading";

type PlaybackUpdate = {
  data: {
    isPaused: boolean;
    position: number;
  };
};

type EmbedController = {
  addListener: (event: "playback_update", callback: (event: PlaybackUpdate) => void) => void;
  pause: () => void;
  seek: (seconds: number) => void;
  destroy: () => void;
};

type IFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    callback: (controller: EmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

const PREVIEW_MS = 30_000;
let cachedApi: IFrameAPI | null = null;

export default function MusicSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let controller: EmbedController | null = null;

    const setup = (api: IFrameAPI) => {
      api.createController(
        container,
        { uri: spotifyTrackUri, width: "100%", height: 152 },
        (embed) => {
          controller = embed;
          embed.addListener("playback_update", (event) => {
            const { isPaused, position } = event.data;
            if (!isPaused && position >= PREVIEW_MS) {
              embed.pause();
              embed.seek(0);
            }
          });
        },
      );
    };

    if (cachedApi) {
      setup(cachedApi);
    } else {
      window.onSpotifyIframeApiReady = (api) => {
        cachedApi = api;
        setup(api);
      };

      if (!document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      controller?.destroy();
    };
  }, []);

  return (
    <section className="mt-6 sm:mt-10" aria-label="Music">
      <SectionHeading>Music</SectionHeading>
      <p className="mb-3 text-sm text-[var(--muted)]">Whatever&rsquo;s playing while I work.</p>
      <div ref={containerRef} aria-label="Spotify player" />
    </section>
  );
}
