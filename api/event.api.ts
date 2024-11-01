// Plugins
import { axios } from '@/lib/axios';

// Types
import { TEventAcademy } from '@/types/event.type';

/**
 * @description Fetch Event Academy
 *
 * @return {Promise<TEventAcademy[]>}
 */
export const fetchEventAcademy = async (params: {
  [x: string]: string | number | undefined | null | string[];
}): Promise<TEventAcademy[]> => {
  const response = await axios.get(`/wp-json/wp/v3/events-academy`, {
    params: {
      ...params,
    },
  });

  return response.data;
};

/**
 * @description Fetch Event Academy Detail
 *
 * @param {number} string
 *
 * @return {Promise<TEventAcademy>}
 */
export const fetchEventAcademyDetail = async ({
  id,
}: {
  id: string;
}): Promise<TEventAcademy> => {
  const response = await axios.get(`/wp-json/wp/v3/events-academy/${id}`);

  return response.data;
};
