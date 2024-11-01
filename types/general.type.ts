// Types
import { TCommonImage, TCommonUrl } from './common.type';

export type TCta = {
  title: string;
};

export type TGeneralMenu = {
  menu_name: string;
  menu_url: TCommonUrl;
};

export type TGeneralHeaders = {
  header_image: {
    dark_mode: TCommonImage;
    light_mode: TCommonImage;
  };
  menus: TGeneralMenu[];
  website_name: string;
};

export type TGeneralFooters = {
  footer_image: {
    dark_mode: TCommonImage;
    light_mode: TCommonImage;
  };
  contact_us: {
    email: string;
    location: string;
  };
  description: string;
  quick_link: TGeneralMenu[];
  social_media: {
    item: {
      light_mode_icon: TCommonImage;
      dark_mode_icon: TCommonImage;
      url: TCommonUrl;
    }[];
  };
};

export type TBaseAutocomplete = {
  results?: {
    [key: string]: string | number;
  }[];
  label: string;
  onSelect: (value: object | string | number) => void;
  handleFocus?: (e: string, name: string) => void;
  ref: React.Ref<HTMLInputElement>;
  placeholder?: string;
  order?: string | number; // Usage to add z index for the dropdown
  containerClass?: string;
  inputClass?: string;
};

export type TGeneralCountries = {
  name: string;
  dial_code: string;
  code: string;
};

export type TGeneralNavAbout = {
  main_link: {
    link: TCommonUrl;
    description: string;
    image: TCommonImage;
  };
  links: {
    link: TCommonUrl;
  }[];
  image: TCommonImage;
};

export type TGeneralNavCareer = {
  link: TCommonUrl;
  description: string;
  image: TCommonImage;
};

export type TGeneralNavProduct = {
  link: TCommonUrl;
  asset: {
    '': null;
    type: string;
    image: TCommonImage;
    has_dark_image: boolean;
    dark_image: TCommonImage;
  };
};

export type TGeneralNavSolution = {
  link: TCommonUrl;
  description: string;
  asset: {
    '': null;
    type: string;
    image: TCommonImage;
    has_dark_image: true;
    dark_image: TCommonImage;
  };
};

export type TGeneralNavResource = {
  link: TCommonUrl;
};

export type TGeneralNavCardano = {
  link: TCommonUrl;
  description: string;
  image: TCommonImage;
};

export type TGeneralNavHeaderLinks = {
  link: TCommonUrl;
  has_sub_menu: boolean;
  nav_type: string;
  solutions_nav: {
    solutions: TGeneralNavSolution[];
    products: TGeneralNavProduct[];
  };
  company_nav: {
    about: TGeneralNavAbout;
    careers: TGeneralNavCareer;
  };
  resources_nav: {
    resources: TGeneralNavResource[];
    cardano: TGeneralNavCardano[];
  };
};

export type TGeneralSocial = {
  discord: string;
  twitter: string;
  reddit: string;
  youtube: string;
  linkedin: string;
  medium: string;
  instagram: string;
};

export type TGeneralNav = {
  header: {
    links: TGeneralNavHeaderLinks[];
  };
  social: TGeneralSocial;
};

export type TGeneralFormType = {
  name: string;
};
