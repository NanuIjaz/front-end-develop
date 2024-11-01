// Type
import { TCommonImage, TCommonMetadata, TCommonUrl } from './common.type';

export type TExpertInstructorItem = {
  image: TCommonImage;
  name: string;
  position: string;
};

export type TCommunityJoinUsItem = {
  tittle: string;
  description: string;
  button: {
    label: string;
    url: TCommonUrl;
  };
  icon: {
    dark_mode: TCommonImage;
    light_mode: TCommonImage;
  };
};

export type TCommunity = {
  experts: {
    heading: string;
    description: string;
    items: TExpertInstructorItem[];
  };
  hero: {
    tittle: string;
    heading: string;
    description: string;
    button_hero: {
      label: string;
      url: TCommonUrl;
    };
  };
  instructors: {
    heading: string;
    items: TExpertInstructorItem[];
  };
  join_area: {
    heading: string;
    button: {
      label: string;
      url: TCommonUrl;
    };
  };
  join_us: {
    heading: string;
    description: string;
    items: TCommunityJoinUsItem[];
  };
  we_work_towards: {
    items: {
      description: string;
    }[];
  };
  metadata: TCommonMetadata;
};
