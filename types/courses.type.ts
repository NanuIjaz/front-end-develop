// Type
import { TCommonImage, TCommonMetadata, TCommonUrl } from './common.type';

export type TCourseGraduateCarousel = {
  image: TCommonImage;
  name: string;
  position: string;
  quote: string;
};

export type TBenefit = {
  heading: string;
  description: string;
};

export type TCourse = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  template: string;
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
    og_description: string;
  };
  acf: {
    about_course: {
      title: string;
      description: string;
      video_overview: string;
    };
    hero: {
      image_hero: TCommonImage;
      excerpt: string;
      brochure: {
        title: string;
        url: string;
        target: string;
      };
    };
    metadata: TCommonMetadata;
    graduate: TCourseGraduateCarousel[];
    schedule_and_syllabus: {
      schedule: {
        description_schedule: string;
        date: {
          start_date: string;
          date_of_completion: string;
        };
        onlineoffline: string;
        status: string;
      };
      syllabus: {
        description_syllabus: string;
        main_syllabus: {
          tittle_main_syllabus: string;
          sub_syllabus: {
            sub_syllabus_tittle: string;
          }[];
        }[];
      };
    };
    benefits_and_requirements: {
      benefit: {
        [key: string]: TBenefit;
      };
      requirement: {
        title: string;
        description: string;
      }[];
    };
    category: [
      {
        term_id: number;
        name: string;
        slug: string;
        term_group: number;
        term_taxonomy_id: number;
        taxonomy: string;
        description: string;
        parent: number;
        count: number;
        filter: string;
      },
    ];
    course_fee: {
      installment: {
        fee: string;
        benefit: {
          item: string;
        }[];
      };
      onetap: {
        fee: string;
        benefit: {
          item: string;
        }[];
      };
    };
    enroll: {
      title: string;
      description: string;
      button: {
        label: string;
        url: TCommonUrl;
      };
    };
    cta: {
      heading: string;
      button: {
        label: string;
        url: TCommonUrl;
      };
    };
    course_status: string;
    hide_cta: boolean;
    cta_type: string;
    header_color: string;
    fetch_posts: boolean;
    fetch_events: boolean;
    fetch_studies: boolean;
  };
};

export type TCourseCategory = {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  yoast_head_json: {
    title: string;
    canonical: string;
    og_locale: string;
    og_type: string;
    og_title: string;
    og_url: string;
    og_site_name: string;
    og_image: TCommonImage[];
  };
};

export type TCourseFee = {
  course_fee: string;
  currency: string;
  success: boolean;
};

export type TCoursePaymentStripe = {
  link: string;
  status: string;
};

export type TCoursePaymentPaypal = {
  link: string;
  status: string;
};

export type TCoursePaymentMethod = {
  currency: string;
  amount: string;
};

export type TCourseFormType = {
  name: string;
};

export type TCourseJoinUs = {
  course: string;
  name: string;
  email: string;
  phone: string;
  fee: string;
  address: string;
  payment: string;
};
