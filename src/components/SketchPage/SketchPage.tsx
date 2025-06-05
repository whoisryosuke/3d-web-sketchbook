import Head from "next/head";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
};

export default function SketchPage({
  title,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>{title && `${title} - `}Ryo's 3D Web Sketchbook</title>
        <meta
          name="description"
          content="Experimenting with 3D web technology"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ position: "fixed", inset: 0 }}>{children}</div>
    </>
  );
}
