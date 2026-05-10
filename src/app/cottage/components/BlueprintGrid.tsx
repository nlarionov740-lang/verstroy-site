type Props = {
  className?: string;
  cellSize?: number;
  opacity?: number;
  color?: string;
};

export default function BlueprintGrid({
  className = "",
  cellSize = 32,
  opacity = 0.06,
  color = "#0a0a0a",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        opacity,
      }}
    />
  );
}
