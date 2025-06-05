import SketchPage from "@/components/SketchPage/SketchPage";
import dynamic from "next/dynamic";

const Design = dynamic(() => import("@/sketches/ExampleComponent"), {
  ssr: false,
});

export default function Page() {
  return (
    <SketchPage title="ExampleComponent">
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
