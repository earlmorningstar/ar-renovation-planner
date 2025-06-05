"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

//dynamic Import

const ARScan = dynamic(() => import("@/features/ar-scan/ARScan"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function ARScanPage() {
  return (
    <div className="h-[calc(100vh-64px)]">
      <Suspense fallback={<LoadingSpinner />}>
        <ARScan />
      </Suspense>
    </div>
  );
}
