"use client";

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #D4A843, transparent 70%)",
          top: "10%",
          left: "20%",
          animation: "meshMove1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[50%] h-[50%] rounded-full blur-[100px] opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #1B2A4A, transparent 70%)",
          bottom: "10%",
          right: "10%",
          animation: "meshMove2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[40%] h-[40%] rounded-full blur-[80px] opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #E4BE6A, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "meshMove3 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
