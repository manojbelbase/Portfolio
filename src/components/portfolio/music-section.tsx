import { spotifyPlaylistEmbedUrl } from "@/data/portfolio-data";
import SectionHeading from "./section-heading";

export default function MusicSection() {
  return (
    <section className="mt-6 sm:mt-10" aria-label="Music">
      <SectionHeading>Music</SectionHeading>
      <p className="mb-3 text-sm text-[var(--muted)]">Songs that fill my days.</p>
      <iframe
        title="Manoj's playlist on Spotify"
        style={{ borderRadius: 12, height: 152 }}
        src={spotifyPlaylistEmbedUrl}
        width="100%"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </section>
  );
}
