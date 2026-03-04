"use client";

  import { LegalPageLayout } from "@musekit/cms";

  export default function Page({ params }: { params: { slug: string } }) {
    return <LegalPageLayout slug={params.slug} />;
  }
  