import SketchPage from "@/components/SketchPage/SketchPage";
import dynamic from "next/dynamic";

const Design = dynamic(
  () => import("@/sketches/WaveformBufferGeoR2/WaveformBufferGeoR2"),
  {
    ssr: false,
  }
);
const WaveformBufferDebugMenu = dynamic(
  () => import("@/sketches/WaveformBufferGeoR2/WaveformBufferDebugMenu"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <SketchPage title="WaveformBufferGeoR2">
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
