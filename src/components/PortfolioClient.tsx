"use client";

import dynamic from "next/dynamic";

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  ssr: false,
  loading: () => (
    <div className="bg-bg-section" style={{ minHeight: "600px" }} />
  ),
});

export default Portfolio;
