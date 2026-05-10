type Props = {
  number: string;
  label: string;
  className?: string;
};

export default function SectionTag({ number, label, className = "" }: Props) {
  return (
    <div
      className={`font-mono text-[10px] tracking-[0.25em] uppercase opacity-60 flex gap-3 ${className}`}
    >
      <span>VER STROY</span>
      <span>·</span>
      <span>{number}</span>
      <span>·</span>
      <span>{label}</span>
    </div>
  );
}
