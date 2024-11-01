'use client';

// Next
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Type
import { TBenefit, TCourse } from '@/types/courses.type';

// Image
import Circle from '@/public/image/circle.png';

// Dynamic Components
const Accordion = dynamic(() =>
  import('@/components/ui/accordion').then(
    (accordions) => accordions.Accordion,
  ),
);
const AccordionContent = dynamic(() =>
  import('@/components/ui/accordion').then(
    (accordions) => accordions.AccordionContent,
  ),
);
const AccordionItem = dynamic(() =>
  import('@/components/ui/accordion').then(
    (accordions) => accordions.AccordionItem,
  ),
);
const AccordionTrigger = dynamic(() =>
  import('@/components/ui/accordion').then(
    (accordions) => accordions.AccordionTrigger,
  ),
);

const CoursesRequirement = ({ data }: { data: TCourse }) => {
  const { requirement } = data.acf.benefits_and_requirements;

  const filteredBenefits = Object.keys(
    data.acf.benefits_and_requirements.benefit,
  )
    .filter(
      (key) =>
        data.acf.benefits_and_requirements.benefit[key].heading.trim() !== '' &&
        data.acf.benefits_and_requirements.benefit[key].description.trim() !==
          '',
    )
    .reduce((obj: { [key: string]: TBenefit }, key: string) => {
      obj[key] = data.acf.benefits_and_requirements.benefit[key];
      return obj;
    }, {});

  return (
    <>
      <section
        className='flex flex-col gap-14 mb-16'
        id='benefits_and_requirements'
      >
        <div className='flex flex-col gap-6'>
          <p className='font-medium dark:!text-navy-200 text-navy-400 uppercase text-xs'>
            BENEFITS
          </p>
          <h2 className='text-2xl xl:text-[32px]'>Benefits you will gain</h2>
        </div>
        {Object.entries(filteredBenefits).length >= 1 && (
          <>
            <div className='p-8 relative hidden xl:block'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 border !border-t-[#0029361A] dark:!border-t-white/10 !border-r-[#0029361A] dark:!border-r-white/10  !border-b-[#0029361A] dark:border-b-white/10 border-l-transparent p-10'>
                {Object.entries(filteredBenefits).slice(0, 2).length >= 1 && (
                  <Image
                    src={Circle}
                    alt='Circle'
                    priority
                    width={40}
                    height={37}
                    className='absolute top-3 left-[25%]'
                  />
                )}
                {Object.entries(filteredBenefits).slice(0, 2).length === 2 && (
                  <Image
                    src={Circle}
                    alt='Circle'
                    priority
                    width={40}
                    height={37}
                    className='absolute top-3 left-[69%]'
                  />
                )}
                {Object.entries(filteredBenefits)
                  .slice(0, 2)
                  .map(([key, benefit], index) => (
                    <div
                      className='bg-navy-50 dark:bg-navy-500/10 border-orange border text-white p-6 rounded-lg'
                      key={key}
                    >
                      <p className='dark:!text-navy-200 mb-10'>0{index + 1}</p>
                      <h2 className='text-2xl font-bold mb-4'>
                        {benefit.heading}
                      </h2>
                      <p className='dark:!text-navy-200 text-sm xl:text-base'>
                        {benefit.description}
                      </p>
                    </div>
                  ))}
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 border !border-l-[#0029361A] dark:border-l-white/10 !border-b-[#0029361A] dark:border-b-white/10 !border-t-[#0029361A] dark:border-t-white/10 border-r-transparent p-10'>
                {Object.entries(filteredBenefits).slice(2, 4).length >= 1 && (
                  <Image
                    src={Circle}
                    alt='Circle'
                    priority
                    width={40}
                    height={37}
                    className='absolute top-[47.5%] left-[25%]'
                  />
                )}
                {Object.entries(filteredBenefits).slice(2, 4).length === 2 && (
                  <Image
                    src={Circle}
                    alt='Circle'
                    priority
                    width={40}
                    height={37}
                    className='absolute top-[47.5%] left-[69%]'
                  />
                )}
                {Object.entries(filteredBenefits)
                  .slice(2, 4)
                  .map(([key, benefit], index) => (
                    <div
                      className='bg-navy-50 dark:bg-navy-500/10 border-orange border text-white p-6 rounded-lg'
                      key={key}
                    >
                      <p className='dark:!text-navy-200 mb-10'>0{index + 3}</p>
                      <h2 className='text-2xl font-bold mb-4'>
                        {benefit.heading}
                      </h2>
                      <p className='dark:!text-navy-200 text-sm xl:text-base'>
                        {benefit.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className='grid grid-cols-1 gap-6 xl:hidden'>
              {Object.entries(filteredBenefits).map(([key, benefit], index) => (
                <div
                  className='bg-navy-500/10 border-orange border text-white p-6 rounded-lg'
                  key={key}
                >
                  <p className='dark:!text-navy-200 mb-10'>0{index + 1}</p>
                  <h2 className='text-2xl font-bold mb-4'>{benefit.heading}</h2>
                  <p className='dark:!text-navy-200'>{benefit.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      {requirement.length >= 1 && (
        <section className='flex flex-col gap-7 w-full'>
          <p className='font-medium dark:!text-navy-200 text-navy-400 uppercase text-xs'>
            Requirements
          </p>
          <h2 className='text-2xl xl:text-[32px]'>
            What you need to know before enrolling
          </h2>
          <Accordion
            type='single'
            collapsible
            defaultValue={requirement[0].title}
            className='flex flex-col gap-6'
          >
            {requirement.map((requirements, index) => (
              <AccordionItem
                key={requirements.title}
                value={requirements.title}
                className='[&[data-state=open]]:linear-requirement dark:[&[data-state=open]]:bg-gradient-to-b from-navy-500/60 to-orange rounded-xs p-6 dark:bg-[#0A313E] dark:border-none border border-navy-100 dark:border-navy-500'
              >
                <AccordionTrigger>
                  <div className='flex items-center gap-6'>
                    <h3 className='text-base xl:text-2xl text-left'>
                      {String(index + 1).padStart(2, '0')}
                    </h3>
                    <h3 className='text-base xl:text-2xl text-left'>
                      {requirements.title}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <hr className='!border-b-[#0029361A] dark:!border-b-white/10 mb-5' />
                  <h4 className='font-normal dark:!text-white text-base xl:text-xl'>
                    {requirements.description}
                  </h4>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </>
  );
};

CoursesRequirement.displayName = 'CoursesRequirement';

export default CoursesRequirement;
