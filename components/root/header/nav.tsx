/* eslint-disable no-shadow */

// Next
import dynamic from 'next/dynamic';

// Framer Motion
import { AnimatePresence, motion } from 'framer-motion';

// Type
import { TGeneralNav } from '@/types/general.type';

// Dynamic Components
const DesktopNav = dynamic(
  () => import('@/components/root/header/desktop-nav'),
);
const MobileNav = dynamic(() => import('@/components/root/header/mobile-nav'));

export default function Nav({
  isNavActive,
  setIsNavActive,
  navigation,
}: {
  isNavActive: boolean;
  setIsNavActive: (isNavActive: boolean) => void;
  navigation: TGeneralNav;
}) {
  return (
    <AnimatePresence>
      {isNavActive && (
        <motion.section
          className='absolute inset-0 z-[90] h-screen w-full overflow-y-auto lg:h-screen lg:overflow-auto'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 },
          }}
        >
          <DesktopNav setIsNavActive={setIsNavActive} navigation={navigation} />
          <MobileNav setIsNavActive={setIsNavActive} navigation={navigation} />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
