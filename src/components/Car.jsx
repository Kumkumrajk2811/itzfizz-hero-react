// Simple side-view car drawn with SVG (no image files needed).
// Wheel groups have classes "wheel-1" and "wheel-2" so GSAP can spin them.
export default function Car({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 400 156" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="200" cy="150" rx="170" ry="5" fill="#000" opacity=".35" />
      <path d="M20 108 Q20 88 52 82 L112 77 Q142 40 192 38 L262 40 Q302 50 326 80 L372 87 Q388 92 388 108 L388 120 L20 120 Z" fill="#C8FF3D" />
      <path d="M128 78 Q150 52 192 50 L222 50 L222 78 Z" fill="#0B1020" />
      <path d="M232 50 L262 51 Q290 58 308 78 L232 78 Z" fill="#0B1020" />
      <rect x="372" y="94" width="16" height="8" rx="3" fill="#FF6B4A" />
      <rect x="20" y="96" width="12" height="8" rx="3" fill="#FF6B4A" />
      <circle cx="95" cy="118" r="34" fill="#0B1020" />
      <circle cx="305" cy="118" r="34" fill="#0B1020" />
      <g className="wheel-1">
        <circle cx="95" cy="118" r="26" fill="#1c2340" />
        <circle cx="95" cy="118" r="9" fill="#C8FF3D" />
        <path d="M95 94V142M71 118H119" stroke="#C8FF3D" strokeWidth="4" />
      </g>
      <g className="wheel-2">
        <circle cx="305" cy="118" r="26" fill="#1c2340" />
        <circle cx="305" cy="118" r="9" fill="#C8FF3D" />
        <path d="M305 94V142M281 118H329" stroke="#C8FF3D" strokeWidth="4" />
      </g>
    </svg>
  );
}
