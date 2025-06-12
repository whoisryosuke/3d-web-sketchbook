import SketchPage from "@/components/SketchPage/SketchPage";
import dynamic from "next/dynamic";

const Design = dynamic(
  () => import("@/sketches/WaveformBufferGeoR2/WaveformBufferGeoR2"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <SketchPage title="WaveformBufferGeoR2">
      <Design />
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
