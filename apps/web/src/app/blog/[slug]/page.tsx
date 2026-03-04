"use client";

  import { BlogPost } from "@musekit/cms";

  export default function Page({ params }: { params: { slug: string } }) {
    return <BlogPost slug={params.slug} />;
  }
  