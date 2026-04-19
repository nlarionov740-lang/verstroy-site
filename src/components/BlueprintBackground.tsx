"use client";

import { motion } from "framer-motion";

const CYCLE = 24;

const T = {
  grid:        { delay: 0,    duration: 1.0 },
  outline:     { delay: 1.0,  duration: 2.0 },
  foundation:  { delay: 3.0,  duration: 1.5 },
  columns:     { delay: 4.5,  duration: 1.5 },
  floors:      { delay: 6.0,  duration: 1.5 },
  roof:        { delay: 7.5,  duration: 2.0 },
  windows:     { delay: 9.5,  duration: 2.5 },
  door:        { delay: 12.0, duration: 1.0 },
  hatching:    { delay: 13.0, duration: 1.5 },
  dims:        { delay: 14.5, duration: 2.5 },
};

function t(sec: number) { return sec / CYCLE; }

function pathAnim(delay: number, duration: number, stroke: string, width = 1.2, fill = "none") {
  const start = t(delay);
  const end = t(delay + duration);
  const holdEnd = t(21.5);
  const fadeEnd = t(CYCLE - 0.5);
  return {
    stroke, strokeWidth: width, fill,
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: [0, 0, 1, 1, 1, 0],
      opacity:    [0, 0, 1, 1, 0.9, 0],
    },
    transition: {
      duration: CYCLE,
      times:    [0, start, end, holdEnd, holdEnd + 0.01, fadeEnd],
      repeat: Infinity,
      repeatDelay: 1.5,
      ease: "easeInOut" as const,
    },
  };
}

export default function BlueprintBackground() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,168,67,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,67,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 500 380" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <motion.path
            d="M50,20 L50,360 M100,20 L100,360 M150,20 L150,360 M200,20 L200,360 M250,20 L250,360 M300,20 L300,360 M350,20 L350,360 M400,20 L400,360 M450,20 L450,360 M20,50 L480,50 M20,100 L480,100 M20,150 L480,150 M20,200 L480,200 M20,250 L480,250 M20,300 L480,300 M20,350 L480,350"
            stroke="rgba(212,168,67,0.07)" strokeWidth={0.5} fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0.8, 0.7, 0] }}
            transition={{ duration: CYCLE, times: [0, t(0), t(1), t(21.5), t(21.51), t(CYCLE - 0.5)], repeat: Infinity, repeatDelay: 1.5 }}
          />
          <motion.path d="M80,310 L80,100 L420,100 L420,310 L80,310" {...pathAnim(T.outline.delay, T.outline.duration, "rgba(212,168,67,0.70)", 2.0)} />
          <motion.path d="M60,310 L440,310 M60,326 L440,326" {...pathAnim(T.foundation.delay, T.foundation.duration, "rgba(212,168,67,0.65)", 1.8)} />
          <motion.path d="M70,310 L70,326 M85,310 L85,326 M100,310 L100,326 M120,310 L120,326 M140,310 L140,326 M160,310 L160,326 M180,310 L180,326 M200,310 L200,326 M220,310 L220,326 M240,310 L240,326 M260,310 L260,326 M280,310 L280,326 M300,310 L300,326 M320,310 L320,326 M340,310 L340,326 M360,310 L360,326 M380,310 L380,326 M400,310 L400,326 M415,310 L415,326 M430,310 L430,326" {...pathAnim(T.foundation.delay + 0.5, T.foundation.duration, "rgba(212,168,67,0.30)", 0.8)} />
          <motion.path d="M152,100 L152,310 M168,100 L168,310 M242,100 L242,310 M258,100 L258,310 M332,100 L332,310 M348,100 L348,310" {...pathAnim(T.columns.delay, T.columns.duration, "rgba(212,168,67,0.45)", 1.2)} />
          <motion.path
            d="M160,80 L160,340 M250,80 L250,340 M340,80 L340,340"
            stroke="rgba(212,168,67,0.25)" strokeWidth={0.7} strokeDasharray="4 4" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 0, 1, 1, 0.9, 0], opacity: [0, 0, 0.7, 0.7, 0.6, 0] }}
            transition={{ duration: CYCLE, times: [0, t(T.columns.delay), t(T.columns.delay + T.columns.duration), t(21.5), t(21.51), t(CYCLE - 0.5)], repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
          />
          <motion.path d="M80,205 L420,205 M80,155 L420,155" {...pathAnim(T.floors.delay, T.floors.duration, "rgba(212,168,67,0.55)", 1.5)} />
          <motion.path d="M65,205 L80,205 M65,155 L80,155 M65,100 L80,100" {...pathAnim(T.floors.delay + 0.3, T.floors.duration, "rgba(255,255,255,0.20)", 0.8)} />
          <motion.path d="M65,100 L250,52 L435,100" {...pathAnim(T.roof.delay, T.roof.duration, "rgba(212,168,67,0.75)", 2.2)} />
          <motion.path d="M220,52 L280,52" {...pathAnim(T.roof.delay + 0.4, T.roof.duration * 0.5, "rgba(212,168,67,0.55)", 1.5)} />
          <motion.path d="M160,100 L190,73 M250,52 L250,100 M340,100 L310,73" {...pathAnim(T.roof.delay + 0.7, T.roof.duration * 0.6, "rgba(212,168,67,0.35)", 0.9)} />
          <motion.path d="M65,100 L65,108 M435,100 L435,108 M65,104 L435,104" {...pathAnim(T.roof.delay + 1.2, T.roof.duration * 0.5, "rgba(212,168,67,0.40)", 1.0)} />
          <motion.path d="M93,218 L93,295 L147,295 L147,218 L93,218 M120,218 L120,295 M93,256 L147,256 M218,218 L218,295 L272,295 L272,218 L218,218 M245,218 L245,295 M218,256 L272,256 M358,218 L358,295 L412,295 L412,218 L358,218 M385,218 L385,295 M358,256 L412,256" {...pathAnim(T.windows.delay, T.windows.duration * 0.5, "rgba(212,168,67,0.60)", 1.1)} />
          <motion.path d="M98,160 L98,198 L142,198 L142,160 L98,160 M120,160 L120,198 M98,179 L142,179 M223,160 L223,198 L267,198 L267,160 L223,160 M245,160 L245,198 M223,179 L267,179 M363,160 L363,198 L407,198 L407,160 L363,160 M385,160 L385,198 M363,179 L407,179" {...pathAnim(T.windows.delay + 0.8, T.windows.duration * 0.5, "rgba(212,168,67,0.60)", 1.1)} />
          <motion.path d="M103,112 L103,148 L137,148 L137,112 L103,112 M120,112 L120,148 M103,130 L137,130 M233,112 L233,148 L267,148 L267,112 L233,112 M250,112 L250,148 M233,130 L267,130 M363,112 L363,148 L397,148 L397,112 L363,112 M380,112 L380,148 M363,130 L397,130" {...pathAnim(T.windows.delay + 1.6, T.windows.duration * 0.4, "rgba(212,168,67,0.55)", 1.0)} />
          <motion.path d="M215,310 L215,248 L285,248 L285,310" {...pathAnim(T.door.delay, T.door.duration, "rgba(212,168,67,0.65)", 1.3)} />
          <motion.path d="M215,248 Q250,228 285,248" {...pathAnim(T.door.delay + 0.3, T.door.duration * 0.7, "rgba(212,168,67,0.65)", 1.3)} />
          <motion.path d="M225,258 L225,300 L275,300 L275,258 L225,258 M250,258 L250,300" {...pathAnim(T.door.delay + 0.5, T.door.duration * 0.5, "rgba(212,168,67,0.35)", 0.8)} />
          <motion.path d="M240,278 L240,282 M240,280 L236,280" {...pathAnim(T.door.delay + 0.7, T.door.duration * 0.3, "rgba(212,168,67,0.50)", 1.5)} />
          <motion.path d="M80,100 L95,115 M80,115 L95,130 M80,130 L95,145 M80,145 L95,160 M80,160 L95,175 M80,175 L95,190 M80,190 L95,205 M80,205 L95,220 M80,220 L95,235 M80,235 L95,250 M80,250 L95,265 M80,265 L95,280 M80,280 L95,295 M80,295 L95,310 M405,100 L420,115 M405,115 L420,130 M405,130 L420,145 M405,145 L420,160 M405,160 L420,175 M405,175 L420,190 M405,190 L420,205 M405,205 L420,220 M405,220 L420,235 M405,235 L420,250 M405,250 L420,265 M405,265 L420,280 M405,280 L420,295 M405,295 L420,310" {...pathAnim(T.hatching.delay, T.hatching.duration, "rgba(212,168,67,0.22)", 0.7)} />
          <motion.path d="M80,345 L420,345 M80,338 L80,352 M420,338 L420,352" {...pathAnim(T.dims.delay, T.dims.duration * 0.4, "rgba(255,255,255,0.22)", 0.8)} />
          <motion.path d="M450,100 L450,310 M443,100 L457,100 M443,310 L457,310" {...pathAnim(T.dims.delay + 0.4, T.dims.duration * 0.4, "rgba(255,255,255,0.22)", 0.8)} />
          <motion.path d="M458,205 L458,310 M453,205 L463,205 M453,310 L463,310" {...pathAnim(T.dims.delay + 0.8, T.dims.duration * 0.3, "rgba(255,255,255,0.18)", 0.6)} />
          <motion.path d="M466,52 L466,100 M461,52 L471,52 M461,100 L471,100" {...pathAnim(T.dims.delay + 1.0, T.dims.duration * 0.3, "rgba(255,255,255,0.18)", 0.6)} />
          <motion.text x="250" y="358" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.45)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.9, 0.9, 0.8, 0] }}
            transition={{ duration: CYCLE, times: [0, t(T.dims.delay + 0.8), t(T.dims.delay + 1.4), t(21.5), t(21.51), t(CYCLE - 0.5)], repeat: Infinity, repeatDelay: 1.5 }}
          >34.0 м</motion.text>
          <motion.text x="476" y="210" textAnchor="start" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.45)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.9, 0.9, 0.8, 0] }}
            transition={{ duration: CYCLE, times: [0, t(T.dims.delay + 1.2), t(T.dims.delay + 1.8), t(21.5), t(21.51), t(CYCLE - 0.5)], repeat: Infinity, repeatDelay: 1.5 }}
          >12.5 м</motion.text>
          <motion.text x="475" y="262" textAnchor="start" fontFamily="monospace" fontSize="7" fill="rgba(255,255,255,0.35)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.85, 0.85, 0.7, 0] }}
            transition={{ duration: CYCLE, times: [0, t(T.dims.delay + 1.5), t(T.dims.delay + 2.0), t(21.5), t(21.51), t(CYCLE - 0.5)], repeat: Infinity, repeatDelay: 1.5 }}
          >3.0 м</motion.text>
          <motion.text x="475" y="78" textAnchor="start" fontFamily="monospace" fontSize="7" fill="rgba(255,255,255,0.35)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.85, 0.85, 0.7, 0] }}
            transition={{ duration: CYCLE, times: [0, t(T.dims.delay + 1.7), t(T.dims.delay + 2.2), t(21.5), t(21.51), t(CYCLE - 0.5)], repeat: Infinity, repeatDelay: 1.5 }}
          >2.5 м</motion.text>
          {[{x:80,label:"А"},{x:160,label:"1"},{x:250,label:"2"},{x:340,label:"3"},{x:420,label:"Б"}].map(({x,label}) => (
            <motion.text key={label} x={x} y="42" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(212,168,67,0.50)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.9, 0.9, 0.8, 0] }}
              transition={{ duration: CYCLE, times: [0, t(T.dims.delay + 0.5), t(T.dims.delay + 1.2), t(21.5), t(21.51), t(CYCLE - 0.5)], repeat: Infinity, repeatDelay: 1.5 }}
            >{label}</motion.text>
          ))}
          <motion.text x="250" y="375" textAnchor="middle" fontFamily="monospace" fontSize="7" letterSpacing="3" fill="rgba(212,168,67,0.30)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0.8, 0.6, 0] }}
            transition={{ duration: CYCLE, times: [0, t(21.0), t(21.5), t(21.5), t(21.51), t(CYCLE - 0.5)], repeat: Infinity, repeatDelay: 1.5 }}
          >ФАСАД 1-1</motion.text>
        </svg>
      </div>
    </>
  );
}
