// Type
import { TCommonImage, TCommonUrl } from './common.type';

export type TContactUsLocationCard = {
  continent: string;
  country: string;
  location: string;
};

export type TSocialMedia = {
  label: string;
  url: TCommonUrl;
  icon: {
    dark_mode: TCommonImage;
    light_mode: TCommonImage;
  };
};

export type TContactUsPage = {
  cta: {
    heading: string;
    button: {
      label: string;
      url: TCommonUrl;
    };
  };
  global_company: {
    heading: string;
    title: string;
    items: {
      continent: string;
      country: string;
      location: string;
    }[];
  };
  hero: {
    heading: string;
    description: string;
    email: string;
    location: string;
  };
  meta_data: {
    title: string;
    keyword: string;
    description: string;
  };
  email_us: {
    title: string;
    'for_general_or_course-related_inquiries:': string;
    'for_smartblocks_information:': string;
  };
};

export type TSuccessSubmitContactUs = {
  message: string;
  success: boolean;
};
