// Plugins
import { axios } from '@/lib/axios';

// Types
import { THomeData } from '@/types/home.type';

/**
 * @description Fetch Homepage Data
 *
 * @return {Promise<THomeData>}
 */
export const fetchHomeData = async (): Promise<THomeData> => {
  const response = await axios.get(`/wp-json/acf/v3/options/homepage`);

  return response.data.acf;
};
