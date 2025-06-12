import SketchPage from "@/components/SketchPage/SketchPage";
import dynamic from "next/dynamic";

const Design = dynamic(
  () => import("@/sketches/WaveformBufferGeoR1/WaveformBufferGeoR1"),
  {
    ssr: false,
  }
);
const WaveformBufferDebugMenu = dynamic(
  () => import("@/sketches/WaveformBufferGeoR1/WaveformBufferDebugMenu"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <SketchPage title="WaveformBufferGeoR1">
      <Design />
      <WaveformBufferDebugMenu />
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
