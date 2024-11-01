// Types
import { TCommonImage, TCommonMetadata, TCommonUrl } from './common.type';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type TEventItem = {
  backgroundImage: string | StaticImport;
  category: string;
  title: string;
  duration: string;
};

export type TEventAcademy = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  share_links: {
    facebook: string;
    linkedin: string;
  };
  yoast_head_json: {
    title: string;
    og_description: string;
    og_type: string;
    og_image: TCommonImage[];
    og_title: string;
  };
  acf: {
    short_description_of_the_event: string;
    date: string;
    time: { start_time: string; times_up: string };
    location: {
      location: string;
      city: string;
      map_url: TCommonUrl;
    };
    schedule: {
      time: { start_time: string; times_up: string };
      agenda: string;
    }[];
    metadata: TCommonMetadata;
    cta: {
      heading: string;
      button: {
        label: string;
        url: TCommonUrl;
      };
    };
    featured_image: TCommonImage;
    booking_button: {
      label: string;
      url: TCommonUrl;
    };
  };
};
