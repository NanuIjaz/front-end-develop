// Type
import { TCommonMetadata } from './common.type';

export type TSubTopic = {
  question: string;
  answer: string;
};

export type TTopic = {
  main_topics: string;
  sub_topics: TSubTopic[];
};

export type TFaqPage = {
  heading: {
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
  };
  topics: {
    topic_items: TTopic[];
  };
  metadata: TCommonMetadata;
};
