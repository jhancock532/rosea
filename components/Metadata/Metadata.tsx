import React from "react";
import Head from "next/head";

type MetadataProps = {
  title: string;
  description: string;
};

export const Metadata = ({ title, description }: MetadataProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);
