// Little fox mascot (SVG). Peeks out above the notes.
export default function Fox({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 8 L40 30 L28 62 Z" fill="#FF6B4A" />
      <path d="M108 8 L80 30 L92 62 Z" fill="#FF6B4A" />
      <path d="M18 18 L34 32 L28 48 Z" fill="#0B1020" />
      <path d="M102 18 L86 32 L92 48 Z" fill="#0B1020" />
      <path d="M20 40 Q60 10 100 40 Q104 78 60 96 Q16 78 20 40 Z" fill="#FF6B4A" />
      <path d="M26 56 Q60 50 94 56 Q84 88 60 96 Q36 88 26 56 Z" fill="#FFF3DC" />
      <circle cx="44" cy="52" r="5" fill="#0B1020" />
      <circle cx="76" cy="52" r="5" fill="#0B1020" />
      <circle cx="46" cy="50" r="1.6" fill="#fff" />
      <circle cx="78" cy="50" r="1.6" fill="#fff" />
      <ellipse cx="60" cy="76" rx="6" ry="4.5" fill="#0B1020" />
    </svg>
  );
}
