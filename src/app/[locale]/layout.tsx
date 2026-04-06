import StructuredData from '@/components/StructuredData';
import { routing } from '@/i18n/routing';
import { baseUrl } from '@/lib/site';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { fontClassName } from '@/lib/fonts';

import '../globals.css';

// Generate metadata dynamically based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const currentUrl = `${baseUrl}/${locale}`;
  const title = `${t('personal_info.full_name')} - ${t('personal_info.title')} | Portfolio`;
  const description = t('sections.hero.description');

  return {
    title,
    description,
    authors: [{ name: t('personal_info.full_name'), url: baseUrl }],
    creator: t('personal_info.full_name'),
    keywords: [
      'Junior Web Developer',
      'Full Stack Developer',
      'PHP Developer',
      'JavaScript Developer',
      'Laravel',
      'Web Development',
      'Cybersecurity',
      'Julio Sánchez Aniceto',
      'juliosn',
    ],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: currentUrl,
      siteName: `${t('personal_info.full_name')} - Portfolio`,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@juliosnchz264',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    other: {
      'theme-color': '#00ADD8',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={fontClassName}>
        <StructuredData locale={locale} />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
