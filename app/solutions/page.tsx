// Next
import { redirect } from 'next/navigation';

// Api
import { fetchSolutions } from '@/api/solution.api';

export const dynamic = 'force-dynamic';

const SolutionsPage = async () => {
  /**
   * @description fetch solutions
   *
   * @return {Promise<void>}
   */
  const solutions = await fetchSolutions({});

  if (solutions.length >= 1) redirect(`/solutions/${solutions[0].slug}`);
  else redirect('/');
};

SolutionsPage.displayName = 'SolutionsPage';

export default SolutionsPage;
