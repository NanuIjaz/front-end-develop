// Type
import {
  TCommonImage,
  TCommonMetadata,
  TCommonUrl,
  TCommonVideo,
} from './common.type';

export type TAchievementItem = {
  number: string;
  label: string;
  image: TCommonImage;
};

export type THomeDirection = {
  tittle: string;
  description: string;
  image: TCommonImage;
};

export type THomeTestimonialItem = {
  image: TCommonImage;
  name: string;
  position: string;
  testimonial: string;
};

export type THomeExpert = {
  tittle: string;
  description: string;
};

export type THomeData = {
  metadata: TCommonMetadata;
  about_academy: {
    description: string;
  };
  achivement: {
    heading: string;
    description: string;
    achivement_items: TAchievementItem[];
  };
  courses_highlight: {
    description: string;
  };
  discover_about_emurgo: {
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
  hero: {
    tittle: string;
    heading: string;
    description: string;
    button: {
      label: string;
      url: TCommonUrl;
    };
    animate: {
      dark_safari: TCommonVideo;
      'dark_non-safari': TCommonVideo;
      light_safari: TCommonVideo;
      'light_non-safari': TCommonVideo;
    };
  };
  our_directions: {
    description: string;
    directions: THomeDirection[];
  };
  partner: {
    heading: string;
    logo_partner: {
      image: TCommonImage | false;
    }[];
  };
  solution_highlight: {
    heading: string;
    item: {
      image: TCommonImage;
      title: string;
      description: string;
    }[];
  };
  testimonials: {
    items: THomeTestimonialItem[];
  };
  upcoming_event: {
    heading: string;
    description: string;
  };
};
