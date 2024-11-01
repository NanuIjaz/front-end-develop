// Plugins
import { axios } from '@/lib/axios';

// Types
import { TElearning } from '@/types/e-learning';

/**
 * @description Fetch E - Learning
 *
 * @return {Promise<TEventAcademy[]>}
 */
export const fetchELearning = async (params: {
  [x: string]: string | number | undefined | null | string[];
}): Promise<TElearning> => {
  const response = await axios.get(`/wp-json/acf/v3/options/elearning`, {
    params: {
      ...params,
    },
  });

  return response.data;
};
