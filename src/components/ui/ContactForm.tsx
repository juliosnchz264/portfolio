'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const t = useTranslations('sections.contact');
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('sending');

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitState('success');

      setTimeout(() => {
        setSubmitState('idle');
        reset();
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 3000);
    }
  };

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
            {t('form.fields.name')}
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: t('form.errors.name.required'),
            })}
            placeholder={t('form.placeholders.name')}
            className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white transition-colors focus:border-gopher-blue focus:ring-1 focus:ring-gopher-blue focus:outline-none"
          />
          {errors.name && <span className="mt-1 text-sm text-error-red">{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
            {t('form.fields.email')}
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: t('form.errors.email.required'),
              pattern: {
                value: emailRegex,
                message: t('form.errors.email.invalid'),
              },
            })}
            placeholder={t('form.placeholders.email')}
            className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white transition-colors focus:border-gopher-blue focus:ring-1 focus:ring-gopher-blue focus:outline-none"
          />
          {errors.email && <span className="mt-1 text-sm text-error-red">{errors.email.message}</span>}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-white">
            {t('form.fields.subject')}
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject', {
              required: t('form.errors.subject.required'),
            })}
            placeholder={t('form.placeholders.subject')}
            className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white transition-colors focus:border-gopher-blue focus:ring-1 focus:ring-gopher-blue focus:outline-none"
          />
          {errors.subject && <span className="mt-1 text-sm text-error-red">{errors.subject.message}</span>}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
            {t('form.fields.message')}
          </label>
          <textarea
            id="message"
            {...register('message', {
              required: t('form.errors.message.required'),
            })}
            placeholder={t('form.placeholders.message')}
            rows={4}
            className="w-full resize-y rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white transition-colors focus:border-gopher-blue focus:ring-1 focus:ring-gopher-blue focus:outline-none"
          />
          {errors.message && <span className="mt-1 text-sm text-error-red">{errors.message.message}</span>}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={submitState === 'sending'}
          className={clsx(
            'rounded px-6 py-2 font-semibold transition-colors',
            submitState === 'success' && 'bg-terminal-green text-black',
            submitState === 'error' && 'bg-error-red text-white',
            submitState !== 'success' &&
              submitState !== 'error' &&
              'bg-gopher-blue text-black hover:bg-gopher-blue-hover'
          )}
          whileHover={submitState === 'idle' ? { scale: 1.02 } : {}}
          whileTap={submitState === 'idle' ? { scale: 0.98 } : {}}
        >
          {submitState === 'idle' && t('form.submit')}
          {submitState === 'sending' && 'Sending...'}
          {submitState === 'success' && 'Message sent!'}
          {submitState === 'error' && 'Error, try again'}
        </motion.button>
      </form>
    </div>
  );
}
