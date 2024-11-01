'use client';

// React
import { useState } from 'react';

// Next
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Form Handler
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Form, FormField } from '@/components/ui/form';

// Api
import { payWithStripe, payWithPaypal, joinUs } from '@/api/courses.api';

// Image
import Stripe from '@/public/image/stripe.png';
import PayPal from '@/public/image/paypal.png';
import CourseImage from '@/public/image/menu-child-items.png';

// Type
import { TCourse, TCourseFee } from '@/types/courses.type';
import { TGeneralCountries } from '@/types/general.type';

// Libs
import { currencyFormat } from '@/lib/utils';

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
const Radio = dynamic(() => import('@/components/root/radio'));
const Textarea = dynamic(() =>
  import('@/components/ui/textarea').then((components) => components.Textarea),
);

const SolutionsJoinUsForm = ({
  countries,
  data,
  courseFee,
  courseFeeInstallment,
}: {
  countries: TGeneralCountries[];
  data: TCourse;
  courseFee: TCourseFee;
  courseFeeInstallment: TCourseFee;
}) => {
  // Data
  const { fee: installmentFee } = data.acf.course_fee.installment;
  const { fee: onetapFee } = data.acf.course_fee.onetap;

  // Hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Course Free
  const installmentFree = [0, '0', ''].includes(installmentFee);
  const onetapFree = [0, '0', ''].includes(onetapFee);
  const freeCourse = installmentFree && onetapFree;

  const FormPaymentSchema = z.object({
    fullName: z.string().min(1, {
      message: 'Full name is required',
    }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email('Please enter valid email'),
    paymentMethod: z.string().min(1, {
      message: 'Company name is required',
    }),
    phoneNumber: z.string().min(1, {
      message: 'Phone Number is required',
    }),
    country: z.string().min(1, {
      message: 'Country is required',
    }),
    countryCode: z.string().min(1, {
      message: 'Country Code is required',
    }),
  });

  const FormFreeSchema = z
    .object({
      socialProfile: z.string(),
      message: z.string(),
      typePayment: z.string(),
    })
    .superRefine((data, ctx) => {
      if (freeCourse) {
        if ([null, ''].includes(data.message)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Social Profile is required',
            path: ['socialProfile'],
          });
        }

        if ([null, ''].includes(data.socialProfile)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Message is required',
            path: ['message'],
          });
        }

        if ([null, ''].includes(data.typePayment)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Type Payment is required',
            path: ['typePayment'],
          });
        }
      }
    });

  const FormSchema = z.intersection(FormPaymentSchema, FormFreeSchema);

  // Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      country: '',
      paymentMethod: 'stripe',
      countryCode: countries[0].dial_code,
      socialProfile: '',
      message: '',
      typePayment: 'One Tap Payment',
    },
  });

  /**
   * @description handle form submit
   *
   * @return {void}
   */
  const onSubmit = async (formValue: z.infer<typeof FormSchema>) => {
    const mapPayload = {
      course: data.yoast_head_json.og_title,
      name: formValue.fullName,
      email: formValue.email,
      phone: formValue.countryCode + formValue.phoneNumber,
      fee:
        formValue.typePayment === 'One Tap Payment'
          ? courseFee.course_fee ?? '-'
          : courseFeeInstallment.course_fee ?? '-',
      address: formValue.country ?? '-',
      payment:
        formValue.paymentMethod === 'stripe'
          ? 'Success - Stripe'
          : 'Success - Paypal',
      social: formValue.socialProfile,
      message: formValue.message ?? '-',
      typePayment: freeCourse ? '-' : formValue.typePayment ?? '-',
    };

    const mapPayloadPayment = {
      currency:
        formValue.typePayment === 'One Tap Payment'
          ? courseFee.currency
          : courseFeeInstallment.currency,
      amount:
        formValue.typePayment === 'One Tap Payment'
          ? onetapFee ?? '-'
          : installmentFee ?? '-',
    };

    try {
      setLoading(true);

      await joinUs(mapPayload);

      if (!freeCourse) {
        if (formValue.paymentMethod === 'stripe') {
          const response = await payWithStripe(mapPayloadPayment);

          window.open(response.link, '_blank');
        } else {
          const response = await payWithPaypal(mapPayloadPayment);

          window.open(response.link, '_blank');
        }
      }

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
    <Card className='xl:min-w-[416px] xl:max-w-xl w-full max-w-[90vw]'>
      <CardContent className='p-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <h2 className='text-2xl xl:text-[40px] text-white dark:!text-navy-700'>
              Course Registration Form
            </h2>
            {success && (
              <p className='text-xl text-white dark:!text-navy-700 font-normal'>
                Your data has been successfully saved, we will redirect you to
                the payment page
              </p>
            )}
            <div className='flex flex-col gap-4 xl:gap-[18px]'>
              <p className='max-sm:-mt-[16px] text-sm xl:text-base font-normal text-white dark:!text-navy-700'>
                Order Summary
              </p>
              <div className='w-fit p-4 border rounded-lg flex items-center gap-4 dark:border-black/10'>
                <Image
                  src={CourseImage}
                  alt='Course Image'
                  priority
                  quality={100}
                  width={60}
                  height={60}
                />
                <div className='flex flex-col gap-2 xl:gap-4'>
                  <h4 className='text-white dark:!text-navy-700 text-base xl:text-xl'>
                    {data.yoast_head_json.og_title}
                  </h4>
                  <p className='body-m text-white dark:!text-navy-400 capitalize text-sm xl:text-base'>
                    {data.acf.category[0].name}
                  </p>
                </div>
              </div>
            </div>
            {!freeCourse && (
              <div className='grid grid-cols-2 items-center gap-4'>
                <p className='text-sm xl:text-base font-normal text-white dark:!text-navy-700 col-span-2'>
                  Type Payment
                </p>
                <FormField
                  control={form.control}
                  name='typePayment'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormControl>
                        <select
                          {...field}
                          className='w-full border border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] !text-white dark:!text-navy-700 h-[55px] px-2 placeholder:text-navy-200'
                        >
                          <option value='One Tap Payment'>
                            One Tap Payment
                          </option>
                          {!installmentFree && (
                            <option value='Installment Payment'>
                              Installment Payment
                            </option>
                          )}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className='grid grid-cols-2 items-center gap-4'>
              <p className='text-sm xl:text-base font-normal text-white dark:!text-navy-700 col-span-2'>
                Profile
              </p>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem className='grid items-center gap-1 col-span-2'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Your Name'
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
                  <FormItem className='grid items-center gap-1 col-span-2'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Your Email'
                        className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] text-white dark:!text-navy-700 h-[55px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='col-span-2 grid grid-cols-4 gap-2'>
                <FormField
                  control={form.control}
                  name='countryCode'
                  render={({ field }) => (
                    <FormItem className='col-span-1'>
                      <FormControl>
                        <select
                          {...field}
                          className='w-full border border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] !text-white dark:!text-navy-700 h-[55px] px-2 backdrop-blur text-tw-grey-900 leading-10 placeholder:text-tw-grey-900'
                        >
                          {countries.map((country) => (
                            <option
                              value={country.dial_code}
                              key={country.dial_code}
                            >
                              {country.dial_code}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem className='grid items-center gap-1 col-span-3'>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Your Phone Number'
                          className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] !text-white dark:!text-navy-700 h-[55px]'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormControl>
                      <select
                        {...field}
                        className='w-full border border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] !text-white dark:!text-navy-700 h-[55px] px-2 placeholder:text-navy-200'
                      >
                        <option value='' disabled selected hidden>
                          Choose a country
                        </option>
                        {countries.map((country) => (
                          <option value={country.name} key={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {freeCourse ? (
                <>
                  <FormField
                    control={form.control}
                    name='socialProfile'
                    render={({ field }) => (
                      <FormItem className='grid items-center gap-1 w-full col-span-2'>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Social Profile'
                            className='border-navy-100/10 dark:border-navy-100 bg-[#0A313E] dark:bg-white rounded-[6px] !text-white dark:!text-navy-700 h-[55px]'
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
                      <FormItem className='grid items-center gap-1 w-full col-span-2'>
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
                </>
              ) : (
                <>
                  <hr className='col-span-2 border-b border-black/10' />
                  <p className='text-sm xl:text-base font-normal text-white dark:!text-navy-700 col-span-2'>
                    Method Payment
                  </p>
                  <div className='flex items-center justify-between gap-[30px] col-span-2'>
                    <div
                      className='p-4 border border-navy-100 flex items-center gap-2 w-full cursor-pointer'
                      onClick={() => form.setValue('paymentMethod', 'stripe')}
                    >
                      <Radio
                        {...form.register('paymentMethod')}
                        onChange={() =>
                          form.setValue('paymentMethod', 'stripe')
                        }
                        value='stripe'
                        checked={form.watch('paymentMethod') === 'stripe'}
                      />
                      <Image
                        src={Stripe}
                        alt='Stripe Logo'
                        priority
                        quality={100}
                        width={52}
                        height={22}
                        className='aspect-auto cursor-pointer filter-white dark:filter-navy-700'
                        onClick={() => form.setValue('paymentMethod', 'stripe')}
                      />
                    </div>
                    <div
                      className='p-4 border border-navy-100 flex items-center gap-2 w-full cursor-pointer'
                      onClick={() => form.setValue('paymentMethod', 'paypal')}
                    >
                      <Radio
                        {...form.register('paymentMethod')}
                        onChange={() =>
                          form.setValue('paymentMethod', 'paypal')
                        }
                        value='paypal'
                        checked={form.watch('paymentMethod') === 'paypal'}
                      />
                      <Image
                        src={PayPal}
                        alt='Paypal Logo'
                        priority
                        quality={100}
                        width={52}
                        height={16}
                        className='aspect-auto cursor-pointer filter-white dark:filter-navy-700'
                        onClick={() => form.setValue('paymentMethod', 'paypal')}
                      />
                    </div>
                  </div>
                  <div className='col-span-2 flex flex-col gap-4 xl:flex-row xl:items-center justify-between py-7'>
                    <h3 className='text-white dark:!text-navy-700 font-medium'>
                      Total:
                    </h3>
                    <h2 className='text-[32px] xl:text-[40px] text-white dark:!text-navy-700 font-normal'>
                      {freeCourse
                        ? 'Free'
                        : currencyFormat(
                            parseInt(
                              form.watch('typePayment') === 'One Tap Payment'
                                ? onetapFee
                                : installmentFee,
                            ),
                            form.watch('typePayment') === 'One Tap Payment'
                              ? courseFee.currency
                              : courseFeeInstallment.currency,
                          )}
                    </h2>
                  </div>
                </>
              )}
              <p className='col-span-2 whitespace-pre-line text-navy-200 dark:!text-navy-700 opacity-50 font-normal xl:text-base text-sm'>
                By clicking submit below, you consent to allow EMURGO to store
                and process the personal information submitted above to provide
                you the content requested.
              </p>
            </div>
            <Button
              className='w-full justify-center'
              type='submit'
              loading={loading}
            >
              Enroll Now
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

SolutionsJoinUsForm.displayName = 'SolutionsJoinUsForm';

export default SolutionsJoinUsForm;
