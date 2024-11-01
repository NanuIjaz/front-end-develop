// Plugins
import { axios } from '@/lib/axios';

// Types
import {
  TGeneralHeaders,
  TGeneralFooters,
  TGeneralCountries,
  TGeneralNav,
  TGeneralFormType,
} from '@/types/general.type';

/**
 * @description Fetch Headers Data
 *
 * @return {Promise<TGeneralHeaders>}
 */
export const fetchHeaders = async (): Promise<TGeneralHeaders> => {
  const response = await axios.get(`/wp-json/acf/v3/options/ea-header`);

  return response.data.acf;
};

/**
 * @description Fetch Headers Navigation
 *
 * @return {Promise<TGeneralNav>}
 */
export const fetchNavigation = async (): Promise<TGeneralNav> => {
  const response = await axios.get(
    'https://www.emurgo.io/_next/data/Kj-vWn20rAb2rxmiq9rBJ/academy.json?slug=academy',
  );

  return response.data.pageProps.options;
};

/**
 * @description Fetch Footers Data
 *
 * @return {Promise<TGeneralFooters>}
 */
export const fetchFooters = async (): Promise<TGeneralFooters> => {
  const response = await axios.get(`/wp-json/acf/v3/options/ea-footer`);

  return response.data.acf;
};

/**
 * @description Fetch Footers Data
 *
 * @return {Promise<TGeneralCountries[]>}
 */
export const fetchCountries = async (): Promise<TGeneralCountries[]> => {
  const response = await axios.get(`/wp-json/country/v3/code`);

  return response.data;
};

/**
 * @description check e learning form type
 *
 * @return {Promise<TGeneralFormType>}
 */
export const checkELearningType = async (): Promise<TGeneralFormType> => {
  const response = await axios.get(`/wp-json/form-config/v3/page-learning`);

  return response.data;
};
