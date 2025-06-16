import SketchPage from "@/components/SketchPage/SketchPage";
import dynamic from "next/dynamic";

const Design = dynamic(
  () => import("@/sketches/TextureExample/TextureExample"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <SketchPage title="TextureExample">
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
