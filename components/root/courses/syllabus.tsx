'use client';

// Next
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Image
import SyllabusImage from '@/public/image/our-direction-item.png';
import SyllabusCircle from '@/public/image/circle.png';

// Type
import { TCourse } from '@/types/courses.type';
import { cn } from '@/lib/utils';

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

const CoursesSyllabus = ({ data }: { data: TCourse }) => {
  const { description_syllabus, main_syllabus } =
    data.acf.schedule_and_syllabus.syllabus;

  return (
    <section className='flex flex-col gap-7 w-full'>
      <p className='font-medium dark:!text-navy-200 text-navy-400 uppercase text-xs'>
        syllabus
      </p>
      <div className='flex flex-col gap-8 w-full'>
        <h2 className='text-2xl xl:text-[32px]'>What will you learn?</h2>
        <p className='font-normal text-xs xl:text-base dark:!text-navy-200 whitespace-pre-line'>
          {description_syllabus}
        </p>
      </div>
      {main_syllabus.length >= 1 && (
        <div className='-mt-2'>
          <Accordion
            type='single'
            collapsible
            defaultValue={main_syllabus[0].tittle_main_syllabus}
            className='flex flex-col gap-6'
          >
            {main_syllabus.map((syllabus) => (
              <AccordionItem
                key={syllabus.tittle_main_syllabus}
                value={syllabus.tittle_main_syllabus}
                className='[&[data-state=open]]:linear-syllabus dark:[&[data-state=open]]:bg-gradient-to-b from-navy-500/60 to-orange rounded-xs p-6 dark:bg-[#0A313E] dark:border-none border border-navy-100 dark:border-navy-500'
              >
                <AccordionTrigger
                  svgClassName={cn(
                    syllabus.sub_syllabus.length <= 0 && 'hidden',
                  )}
                >
                  <div className='flex gap-6 items-center'>
                    <Image
                      src={SyllabusImage}
                      alt='Image'
                      quality={100}
                      priority
                      width={49}
                      height={49}
                    />
                    <h3 className='text-base xl:text-2xl text-left'>
                      {syllabus.tittle_main_syllabus}
                    </h3>
                  </div>
                </AccordionTrigger>
                {syllabus.sub_syllabus.length >= 1 && (
                  <AccordionContent>
                    <hr className='border-white/10 mb-5' />
                    <div className='grid grid-cols-1 xl:grid-cols-2 justify-between gap-y-5'>
                      {syllabus.sub_syllabus.map((subSyllabus) => (
                        <div
                          className='flex items-center xl:items-start gap-1'
                          key={subSyllabus.sub_syllabus_tittle}
                        >
                          <Image
                            src={SyllabusCircle}
                            alt='Image'
                            quality={100}
                            priority
                            width={37}
                            height={37}
                            className='h-fit'
                          />
                          <h4 className='text-base xl:text-xl'>
                            {subSyllabus.sub_syllabus_tittle}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </section>
  );
};

CoursesSyllabus.displayName = 'CoursesSyllabus';

export default CoursesSyllabus;
