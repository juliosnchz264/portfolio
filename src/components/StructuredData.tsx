import { getTranslations } from 'next-intl/server';

interface StructuredDataProps {
  type?: 'person' | 'website' | 'breadcrumb' | 'all';
  locale: string;
}

export default async function StructuredData({ type = 'all', locale }: StructuredDataProps) {
  const t = await getTranslations({ locale });

  const baseUrl = 'https://juliosn.dev'; // TODO: update with your actual domain
  const currentUrl = `${baseUrl}/${locale}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t('personal_info.full_name'),
    jobTitle: t('personal_info.title'),
    description: t('sections.hero.description'),
    url: baseUrl,
    image: `${baseUrl}/images/profile/normal.webp`,
    sameAs: [
      'https://github.com/juliosnchz264',
      'https://www.linkedin.com/in/julio-s%C3%A1nchez-aniceto-453738276/',
    ],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'PHP',
      'JavaScript',
      'Laravel',
      'React',
      'MySQL',
      'Cybersecurity',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: t('personal_info.title'),
      occupationLocation: {
        '@type': 'Country',
        name: 'Spain',
      },
      skills: [
        'PHP',
        'JavaScript',
        'Laravel',
        'React',
        'MySQL',
        'MongoDB',
        'HTML & CSS',
        'WordPress',
        'Docker',
      ],
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Edib Fleming',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${t('personal_info.full_name')} - Portfolio`,
    description: t('sections.hero.description'),
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: t('personal_info.full_name'),
    },
    inLanguage: [
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('navigation.home'),
        item: currentUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navigation.about'),
        item: `${currentUrl}#about`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t('navigation.experience'),
        item: `${currentUrl}#experience`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: t('navigation.skills'),
        item: `${currentUrl}#skills`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: t('navigation.projects'),
        item: `${currentUrl}#projects`,
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: t('navigation.contact'),
        item: `${currentUrl}#contact`,
      },
    ],
  };

  const getSchemaData = () => {
    switch (type) {
      case 'person':
        return personSchema;
      case 'website':
        return websiteSchema;
      case 'breadcrumb':
        return breadcrumbSchema;
      case 'all':
      default:
        return [personSchema, websiteSchema, breadcrumbSchema];
    }
  };

  const schemaData = getSchemaData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}
