// Plugins
import { axios } from '@/lib/axios';

// Types
import {
  TContactUsPage,
  TSuccessSubmitContactUs,
} from '@/types/contact-us.type';

/**
 * @description Fetch Community Us Page Data
 *
 * @return {Promise<TContactUsPage>}
 */
export const fetchContactUs = async (): Promise<TContactUsPage> => {
  const response = await axios.get(`/wp-json/acf/v3/options/contact-us`);

  return response.data.acf;
};

/**
 * @description Submit form contact us
 *
 * @param {TBD} payload
 *
 * @return {Promise<TSuccessSubmitContactUs>}
 */
export const contactUs = async (
  payload: unknown,
): Promise<TSuccessSubmitContactUs> => {
  const response = await axios.post(
    `/wp-json/custom/v1/form-data/4117`,
    payload,
  );

  return response.data;
};
