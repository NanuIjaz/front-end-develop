// Plugins
import { axios } from '@/lib/axios';

// Types
import { TCommunity } from '@/types/community.type';

/**
 * @description Fetch Community Data
 *
 * @return {Promise<TCommunity>}
 */
export const fetchCommunity = async (): Promise<TCommunity> => {
  const response = await axios.get(`/wp-json/acf/v3/options/community`);

  return response.data.acf;
};
