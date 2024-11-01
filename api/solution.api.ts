// Plugins
import { axios } from '@/lib/axios';

// Types
import { TSolution } from '@/types/solution.type';

/**
 * @description Fetch Solution List
 *
 * @return {Promise<TSolution[]>}
 */
export const fetchSolutions = async (params: {
  [x: string]: string | number | undefined | null | string[];
}): Promise<TSolution[]> => {
  const response = await axios.get(`/wp-json/wp/v3/solution`, {
    params: {
      ...params,
    },
  });

  return response.data;
};

/**
 * @description Fetch Solution Detail
 *
 * @return {Promise<TSolution>}
 */
export const fetchSolutionDetail = async ({
  id,
}: {
  id: string;
}): Promise<TSolution> => {
  const response = await axios.get(`/wp-json/wp/v3/solution/${id}`);

  return response.data;
};
