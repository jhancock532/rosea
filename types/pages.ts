type Settings = {
  siteName: string;
};

type Metadata = {
  title: string;
  description: string;
};

type Content = {
  title: string;
  introduction: string;
};

export type Page = {
  settings: Settings;
  metadata: Metadata;
  content: Content;
};
