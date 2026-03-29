import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
  showTagline?: boolean;
};

export default function BrandLogo({
  compact = false,
  showTagline = !compact,
}: BrandLogoProps) {
  const wrapperClass = "gap-3";
  const iconSize = compact ? 32 : 40;
  const titleClass = compact
    ? "text-lg tracking-[0.18em]"
    : "text-2xl tracking-[0.32em]";

  return (
    <span className={`inline-flex items-end ${wrapperClass}`}>
      <Image
        src="/images/logo-icon.png"
        alt="ВЕР СТРОЙ"
        width={iconSize}
        height={iconSize}
        sizes={`${iconSize}px`}
        className={`shrink-0 ${showTagline ? "mb-0.5" : ""}`}
        preload={true}
      />

      <span className="flex min-w-0 flex-col">
        <span className={`font-montserrat font-semibold uppercase leading-none text-white ${titleClass}`}>
          ВЕР <span className="text-accent">СТРОЙ</span>
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
