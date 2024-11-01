'use client';

// React
import { useState, useEffect } from 'react';

// Next
import dynamic from 'next/dynamic';

// Form Handler
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Form, FormField } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Type
import { TCourse } from '@/types/courses.type';

// Api
import { contactUs } from '@/api/contact-us.api';

// Dynamic Component
const Button = dynamic(() =>
  import('@/components/ui/button').then((buttons) => buttons.Button),
);
const Card = dynamic(() =>
  import('@/components/ui/card').then((cards) => cards.Card),
);
const CardContent = dynamic(() =>
  import('@/components/ui/card').then((cards) => cards.CardContent),
);
const FormControl = dynamic(() =>
  import('@/components/ui/form').then((components) => components.FormControl),
);
const FormItem = dynamic(() =>
  import('@/components/ui/form').then((components) => components.FormItem),
);
const FormMessage = dynamic(() =>
  import('@/components/ui/form').then((components) => components.FormMessage),
);
const Input = dynamic(() =>
  import('@/components/ui/input').then((components) => components.Input),
);
const Textarea = dynamic(() =>
  import('@/components/ui/textarea').then((components) => components.Textarea),
);

const SolutionsJoinUsForm = ({ courses }: { courses: TCourse[] }) => {
  // Hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const FormSchema = z.object({
    firstName: z.string().min(1, {
      message: 'First name is required',
    }),
    lastName: z.string().min(1, {
      message: 'Last name is required',
    }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email('Please enter valid email'),
    companyName: z.string().min(1, {
      message: 'Company name is required',
    }),
    courses: z.string().min(1, {
      message: 'Courses is required',
    }),
    message: z.string().min(1, {
      message: 'Message is required',
    }),
  });

  // Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      courses: '',
      message: '',
    },
  });

  /**
   * @description handle form submit
   *
   * @return {void}
   */
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const mapPayload = {
      name1: data.firstName,
      name2: data.lastName,
      email1: data.email,
      text1: data.companyName,
      select1: data.courses,
      textarea1: data.message,
    };

    try {
      setLoading(true);

      await contactUs(mapPayload);

      setSuccess(true);
    } catch (_) {
      //
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  useEffect(() => {
    if (success)
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
  }, [success]);

  return (
    <Card className='min-w-full xl:min-w-[416px] xl:max-w-xl'>
      <CardContent className='p-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <p className='text-xl text-white dark:text-navy-700 font-normal'>
              You can reach us anytime
            </p>
            {success && (
              <p className='text-xl text-white dark:text-navy-700 font-normal'>
                Your data has been successfully saved, we will contact you
                shortly.
              </p>
            )}
            <div className='grid grid-cols-2 items-center gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 col-span-2 xl:col-span-1'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Full Name'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 col-span-2 xl:col-span-1'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Last Name'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 col-span-2 xl:col-span-1'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Email'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 col-span-2 xl:col-span-1'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Company Name'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='courses'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(val) => form.setValue('courses', val)}
                      >
                        <FormControl>
                          <SelectTrigger
                            autoFocus={false}
                            className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                          >
                            <SelectValue placeholder='Courses' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem
                              value={course.yoast_head_json.title}
                              key={course.id}
                            >
                              {course.yoast_head_json.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder='Message'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className='col-span-2 whitespace-pre-line text-white dark:!text-navy-700 dark:opacity-50 font-normal'>
                By clicking submit below, you consent to allow EMURGO to store
                and process the personal information submitted above to provide
                you the content requested.
              </p>
            </div>
            <Button className='w-full xl:w-fit' type='submit' loading={loading}>
              Send Enquiry
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

SolutionsJoinUsForm.displayName = 'SolutionsJoinUsForm';

export default SolutionsJoinUsForm;
