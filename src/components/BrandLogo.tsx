type BrandLogoProps = {
  compact?: boolean;
  showTagline?: boolean;
};

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/*
        Reproduction of the ВЕР СТРОЙ logo:
        - Shield/house shape with peaked roof
        - Crane arm to the left with hanging hook
        - Angled building panels inside
        - Double swoosh curve at bottom right
      */}

      {/* Roof left slope + crane arm */}
      <line x1="5" y1="48" x2="55" y2="8" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      {/* Crane arm extending left */}
      <line x1="5" y1="48" x2="5" y2="48" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="18" y1="40" x2="0" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Crane vertical strut */}
      <line x1="18" y1="40" x2="18" y2="58" stroke="currentColor" strokeWidth="2.5" />
      {/* Cable and hook */}
      <line x1="6" y1="40" x2="6" y2="52" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 52 Q3.5 56.5 6 56.5 Q8.5 56.5 8.5 52" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Roof right slope — goes to shield edge */}
      <path d="M55 8 L95 35 L95 48" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Shield right edge with inward curve */}
      <path d="M95 48 Q92 55 82 58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Inner building panels — angled parallelograms */}
      {/* Left panel */}
      <path d="M30 58 L42 25 L48 25 L36 58Z" fill="currentColor" />
      {/* Center panel */}
      <path d="M42 58 L56 18 L63 18 L49 58Z" fill="currentColor" />
      {/* Right panel (shorter, inside shield curve) */}
      <path d="M55 58 L70 22 L76 22 L65 50 Q62 56 58 58Z" fill="currentColor" />

      {/* Dark gaps between panels — created by spacing */}

      {/* Bottom swoosh curves */}
      <path
        d="M22 72 Q50 62 75 50 Q90 42 95 35"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 82 Q52 70 80 56 Q95 48 100 40"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />

      {/* Left wall */}
      <line x1="22" y1="55" x2="22" y2="72" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export default function BrandLogo({
  compact = false,
  showTagline = !compact,
}: BrandLogoProps) {
  const wrapperClass = compact ? "gap-2" : "gap-3";
  const iconClass = compact ? "h-10 w-auto" : "h-12 w-auto";
  const titleClass = compact
    ? "text-base tracking-[0.18em]"
    : "text-xl tracking-[0.32em]";

  return (
    <span className={`inline-flex items-center ${wrapperClass}`}>
      <LogoIcon className={`${iconClass} text-white shrink-0`} />

      <span className="flex min-w-0 flex-col">
        <span className={`font-montserrat font-semibold uppercase leading-none text-white ${titleClass}`}>
          ВЕР<span className="text-accent">СТРОЙ</span>
        </span>
        {showTagline ? (
          <span className="mt-1 text-[10px] uppercase tracking-[0.34em] text-text-muted sm:text-[11px]">
            Строительная компания
          </span>
        ) : null}
      </span>
    </span>
  );
}
