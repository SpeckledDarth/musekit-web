"use client";

  import { FeatureSubPage } from "@musekit/cms";

  export default function Page({ params }: { params: { slug: string } }) {
    return <FeatureSubPage slug={params.slug} />;
  }
  