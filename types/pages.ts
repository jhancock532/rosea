type Metadata = {
  title: string;
  description: string;
};

type Content = {
  title: string;
  introduction: string;
  richtext: string;
};

export type Page = {
  metadata: Metadata;
  content: Content;
};

export type PageLink = {
  title: string;
  introduction: string;
  url: string;
};
