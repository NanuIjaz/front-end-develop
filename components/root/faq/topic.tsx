'use client';

// React
import { useState, useEffect } from 'react';

// Next
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

// Libs
import { cn } from '@/lib/utils';

// Type
import { TFaqPage, TTopic } from '@/types/faq.type';

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

const FaqTopic = ({ data }: { data: TFaqPage }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [activeTopic, setActiveTopic] = useState<TTopic | null>(null);

  useEffect(() => {
    if (search) {
      const searchLower = decodeURIComponent(search).toLowerCase();

      const newFilteredTopics = data.topics.topic_items
        .map((topic) => {
          const newSubTopics = topic.sub_topics
            .map((subTopic) => {
              const questionLower = subTopic.question.toLowerCase();
              const relevanceScore =
                questionLower.split(searchLower).length - 1;
              return { ...subTopic, relevanceScore };
            })
            .filter((subTopic) => subTopic.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore);

          if (newSubTopics.length > 0) {
            return { ...topic, sub_topics: newSubTopics };
          }
          return null;
        })
        .filter((topic) => topic !== null)
        .sort(
          (a, b) =>
            b!.sub_topics[0].relevanceScore - a!.sub_topics[0].relevanceScore,
        );

      setActiveTopic(newFilteredTopics[0] as TTopic);
    } else {
      setActiveTopic(data.topics.topic_items[0]);
    }
  }, [search, data.topics.topic_items]);

  return (
    <section className='bg-white dark:bg-[#052D3A] dark:xl:bg-[#01222D] !pb-40 !pt-20'>
      <div className='xl:container grid grid-cols-1 xl:grid-cols-6 gap-10 xl:gap-[162px] px-5 2xl:px-0'>
        <div className='xl:col-span-2 flex-col gap-7 hidden xl:flex'>
          <p className='uppercase font-normal tracking-widest'>
            {search ? 'Result search' : 'Topics'}
          </p>
          <h2>
            {search
              ? `Your Search “ ${decodeURIComponent(search)} “`
              : 'Search the FAQs'}
          </h2>

          {!search ? (
            <div className='flex flex-col gap-5 mt-5'>
              {data.topics.topic_items.length >= 1 &&
                data.topics.topic_items.map((topics) => (
                  <div
                    className={cn(
                      'p-6 hover:bg-gradient-to-b from-navy-500/60 from-40% to-orange/80 rounded-xs',
                      activeTopic?.main_topics === topics.main_topics &&
                        'bg-gradient-to-b shadow-47',
                    )}
                    key={topics.main_topics}
                    onClick={() => setActiveTopic(topics)}
                  >
                    <h4 className='text-[24px]'>{topics.main_topics}</h4>
                  </div>
                ))}
            </div>
          ) : (
            <Link href='/faq' className='underline'>
              Clear Search
            </Link>
          )}
        </div>
        <div className='flex xl:hidden flex-col gap-6 items-center'>
          <p className='uppercase font-normal tracking-widest'>
            {search ? 'Result search' : 'Topics'}
          </p>
          <h2 className='text-2xl'>
            {search
              ? `Your Search “ ${decodeURIComponent(search)} “`
              : 'Search the FAQs'}
          </h2>
          <div className='items-center max-w-full overflow-x-auto flex'>
            {data.topics.topic_items.length >= 1 &&
              data.topics.topic_items.map((topics) => {
                const activeTab =
                  activeTopic?.main_topics === topics.main_topics;

                return (
                  <div
                    className='transition-all duration-300 group px-4 cursor-pointer'
                    key={topics.main_topics}
                    onClick={() => setActiveTopic(topics)}
                  >
                    <div
                      className={cn(
                        'flex h-full w-full items-center justify-center py-8 text-xl text-nowrap opacity-50 !font-normal dark:!text-[#CCD4D7] hover:!font-medium capitalize',
                        activeTab &&
                          '!font-medium dark:!text-[#CCD4D7] opacity-100',
                      )}
                    >
                      {topics.main_topics}
                    </div>

                    {activeTab && (
                      <div className='h-0.5 relative [background:linear-gradient(220.57deg,_#ff1055,_#ffd363)]' />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div className='xl:col-span-4 w-full'>
          {activeTopic && activeTopic.sub_topics.length >= 1 && (
            <Accordion
              type='single'
              collapsible
              defaultValue={activeTopic.sub_topics[0].question}
              className='flex flex-col gap-6'
            >
              {activeTopic.sub_topics.map((subTopic) => (
                <AccordionItem
                  key={subTopic.question}
                  value={subTopic.question}
                  className='dark:bg-[#0A313E] border border-black/10 rounded-xs py-6 px-4'
                >
                  <AccordionTrigger className='font-bold text-base xl:text-2xl text-left leading-[17.6px] xl:leading-[26.4px]'>
                    {subTopic.question}
                  </AccordionTrigger>
                  <AccordionContent className='font-normal text-base text-navy-400 dark:text-navy-200 whitespace-pre-line'>
                    <div
                      className='rich-text'
                      dangerouslySetInnerHTML={{
                        __html: subTopic.answer,
                      }}
                    ></div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

FaqTopic.displayName = 'FaqTopic';

export default FaqTopic;
