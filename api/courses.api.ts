// Plugins
import { axios } from '@/lib/axios';

// Types
import {
  TCourse,
  TCourseFee,
  TCourseCategory,
  TCoursePaymentStripe,
  TCoursePaymentPaypal,
  TCoursePaymentMethod,
  TCourseFormType,
  TCourseJoinUs,
} from '@/types/courses.type';

/**
 * @description Fetch Courses
 *
 * @return {Promise<TCourse[]>}
 */
export const fetchCourses = async (): Promise<TCourse[]> => {
  const response = await axios.get(`/wp-json/wp/v3/courses`);

  return response.data;
};

/**
 * @description Fetch Course Categories
 *
 * @return {Promise<TCourseCategory[]>}
 */
export const fetchCourseCategories = async (params?: {
  [x: string]: string | number | undefined | null | string[];
}): Promise<TCourseCategory[]> => {
  const response = await axios.get(`/wp-json/wp/v2/categories`, {
    params: { ...params },
  });

  return response.data;
};

/**
 * @description Fetch Courses By Category
 *
 * @return {Promise<TCourse[]>}
 */
export const fetchCoursesByCategory = async (params: {
  [x: string]: string | number | undefined | null;
}): Promise<TCourse[]> => {
  const response = await axios.get(
    `/wp-json/wp/v3/courses/category/${params.categories}`,
    {
      params: {
        ...params,
        'max-posts': params.maxItems ?? 6,
      },
    },
  );

  return response.data;
};

/**
 * @description Fetch Courses By Category
 *
 * @return {Promise<TCourse[]>}
 */
export const fetchAllCourse = async (params: {
  [x: string]: string | number | undefined | null;
}): Promise<TCourse[]> => {
  const response = await axios.get(`/wp-json/wp/v3/courses`, {
    params: {
      ...params,
      'max-posts': params.maxItems ?? 6,
    },
  });

  return response.data;
};

/**
 * @description Fetch Course Detail
 *
 * @return {Promise<TCourse>}
 */
export const fetchCourse = async (id: string): Promise<TCourse> => {
  const response = await axios.get(`/wp-json/wp/v3/courses/${id}`);

  return response.data;
};

/**
 * @description Submit form enroll course
 *
 * @param {TBD} payload
 *
 * @return {Promise<TSuccessSubmitContactUs>}
 */
export const enrollCourse = async (payload: unknown): Promise<unknown> => {
  const response = await axios.post(
    `/wp-json/custom/v1/form-data/4119`,
    payload,
  );

  return response.data;
};

/**
 * @description Fetch Course Fee Onetap
 *
 * @return {Promise<TCourseFee>}
 */
export const fetchCourseFeeOnetap = async (id: string): Promise<TCourseFee> => {
  const response = await axios.get(
    `/wp-json/wp/v3/courses/${id}/get-course-fee-onetap`,
  );

  return response.data;
};

/**
 * @description Fetch Course Fee Installment
 *
 * @return {Promise<TCourseFee>}
 */
export const fetchCourseFeeInstallment = async (
  id: string,
): Promise<TCourseFee> => {
  const response = await axios.get(
    `/wp-json/wp/v3/courses/${id}/get-course-fee-installment`,
  );

  return response.data;
};

/**
 * @description Submit course payment with stripe
 *
 * @param {TCoursePaymentMethod} payload
 *
 * @return {Promise<TCoursePaymentStripe>}
 */
export const payWithStripe = async (
  payload: TCoursePaymentMethod,
): Promise<TCoursePaymentStripe> => {
  const response = await axios.post(
    `/wp-json/checkout-links/v1/stripe`,
    payload,
  );

  return response.data;
};

/**
 * @description Submit course payment with paypal
 *
 * @param {TCoursePaymentMethod} payload
 *
 * @return {Promise<TCoursePaymentPaypal>}
 */
export const payWithPaypal = async (
  payload: TCoursePaymentMethod,
): Promise<TCoursePaymentPaypal> => {
  const response = await axios.post(
    `/wp-json/checkout-links/v1/paypal`,
    payload,
  );

  return response.data;
};

/**
 * @description Submit form join us
 *
 * @param {TCourseJoinUs} payload
 *
 * @return {Promise<TSuccessSubmitContactUs>}
 */
export const joinUs = async (payload: TCourseJoinUs): Promise<any> => {
  const response = await axios.post(
    `/wp-json/custom/v1/form-data/4119`,
    payload,
  );

  return response.data;
};

/**
 * @description check course form type
 *
 * @return {Promise<TCourseFormType>}
 */
export const checkCourseFormType = async (): Promise<TCourseFormType> => {
  const response = await axios.get(`/wp-json/form-config/v3/page-course`);

  return response.data;
};
