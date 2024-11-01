'use client';

// React
import { useState } from 'react';

// Next
import dynamic from 'next/dynamic';

// Components
import { Form, FormField } from '@/components/ui/form';

// Form Handler
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

const ContactUsForm = () => {
  // Hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Schema
  const FormSchema = z.object({
    firstName: z.string().min(1, {
      message: 'Full Name is required',
    }),
    position: z.string().min(1, {
      message: 'Position is required',
    }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email('Please enter valid email'),
    company: z.string().min(1, {
      message: 'Company is required',
    }),
    socialProfile: z.string().min(1, {
      message: 'Social Profile is required',
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
      position: '',
      email: '',
      company: '',
      socialProfile: '',
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
      email1: data.email,
      text3: data.position,
      text1: data.company,
      text2: data.socialProfile,
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

  // useEffect(() => {
  //   if (success)
  //     setTimeout(() => {
  //       setSuccess(false);
  //     }, 1500);
  // }, [success]);

  return (
    <Card className='xl:min-w-[416px] xl:max-w-xl w-full xl:mt-20'>
      <CardContent className='p-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <h2 className='text-2xl xl:text-[40px] text-white dark:!text-navy-700'>
              You can reach us anytime
            </h2>
            {success && (
              <p className='text-xl text-white dark:!text-navy-700 font-normal'>
                Your data has been successfully saved, we will contact you
                shortly.
              </p>
            )}
            <div className='flex flex-col items-center gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 w-full'>
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
                name='email'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 w-full'>
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
                name='company'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 w-full'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Company'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='position'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 w-full'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Position'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='socialProfile'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 w-full'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Social Profile'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 w-full'>
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
              <p className='col-span-2 whitespace-pre-line text-navy-200 dark:!text-navy-700 opacity-50 font-normal'>
                By clicking submit below, you consent to allow EMURGO to store
                and process the personal information submitted above to provide
                you the content requested.
              </p>
            </div>
            <Button className='w-full xl:w-fit' type='submit' loading={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

ContactUsForm.displayName = 'ContactUsForm';

export default ContactUsForm;
