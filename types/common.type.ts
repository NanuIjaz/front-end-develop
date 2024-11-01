import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type TCommonImage = {
  id: number;
  title: string;
  url: string | StaticImport;
  alt: string;
  description: string;
  caption: string;
  date: string;
  mime_type: string;
  width: number;
  height: number;
};

export type TCommonUrl = {
  title: string;
  url: string;
  target: string;
};

export type TCommonMetadata = {
  title: string;
  keyword: string;
  description: string;
};

export type TCommonVideo = {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
};
