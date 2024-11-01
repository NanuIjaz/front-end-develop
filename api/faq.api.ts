// Plugins
import { axios } from '@/lib/axios';

// Types
import { TFaqPage } from '@/types/faq.type';

/**
 * @description Fetch Faq Page Data
 *
 * @return {Promise<TFaqPage>}
 */
export const fetchFaqPage = async (): Promise<TFaqPage> => {
  const response = await axios.get(`/wp-json/acf/v3/options/faq`);

  return response.data.acf;
};
