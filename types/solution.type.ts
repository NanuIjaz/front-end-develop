// Type
import { TCommonImage, TCommonMetadata, TCommonVideo } from './common.type';

export type TSolution = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  yoast_head_json: {
    title: string;
    canonical: string;
    og_locale: string;
    og_type: string;
    og_title: string;
    og_url: string;
    og_site_name: string;
    article_modified_time: string;
    og_image: TCommonImage[];
  };
  acf: {
    hero: {
      logo_image: {
        dark: TCommonImage;
        light: TCommonImage;
      };
      heading: string;
      description: string;
      button: {
        label: string;
        url: {
          title: string;
          url: string;
          target: string;
        };
      };
    };
    vision: {
      heading: string;
      description: string;
      items: {
        description: string;
      }[];
    };
    our_partner: {
      heading: string;
      logo_partner: {
        image: TCommonImage;
      }[];
    };
    introduction_video: {
      heading: string;
      video_url: TCommonVideo;
    };
    key_features: {
      heading: string;
      items: {
        image: TCommonImage;
        heading: string;
        description: string;
      }[];
    };
    highlight_ambasador: {
      heading: string;
      title: string;
      description: string;
      image: TCommonImage;
    };
    contact_us: {
      heading: string;
      description: string;
      email: string;
      location: string;
    };
    cta: {
      heading: string;
      button: {
        label: string;
        url: {
          title: string;
          url: string;
          target: string;
        };
      };
    };
    metadata: TCommonMetadata;
    hide_cta: boolean;
    cta_type: string;
    header_color: string;
    fetch_posts: boolean;
    fetch_events: boolean;
    fetch_studies: boolean;
  };
};
