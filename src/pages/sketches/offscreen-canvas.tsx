import SketchPage from "@/components/SketchPage/SketchPage";
import dynamic from "next/dynamic";
import { useRef } from "react";

const Design = dynamic(
  () => import("@/sketches/OffscreenCanvas/OffscreenCanvas"),
  {
    ssr: false,
  }
);

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <SketchPage title="OffscreenCanvas">
      <Design canvasRef={canvasRef} />
      <canvas ref={canvasRef} width={256} height={256} />
    </SketchPage>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "",
    },
  };
}
