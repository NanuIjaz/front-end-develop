// Common
import { TCommonImage, TCommonMetadata, TCommonUrl } from './common.type';

export type TElearning = {
  acf: {
    hero: {
      hero_image: TCommonImage;
      heading: string;
      title: string;
      description: string;
      hero_button: {
        label: string;
        url: TCommonUrl;
      };
    };
    metadata: TCommonMetadata;
    waitlist: {
      heading: string;
      title: string;
      description: string;
    };
  };
};
