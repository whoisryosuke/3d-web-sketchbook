import { readdirSync } from "fs";
import { Head } from "next/document";
import Link from "next/link";
import path from "path";

type Props = {
  pages: string[];
};

export default function Page({ pages }: Props) {
  return (
    <>
      <div style={{ padding: "3rem" }}>
        <h1>Sketches</h1>
        <ul>
          {pages.map((page) => (
            <li key={page}>
              <Link href={`/sketches/${page}`}>{page.replace("-", " ")}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const experimentPath = path.join("./src/pages/sketches");
  const experimentPages = readdirSync(experimentPath);
  const pages = experimentPages.map((page) => page.replace(".tsx", ""));

  return {
    props: {
      title: "",
      pages,
    },
  };
}
