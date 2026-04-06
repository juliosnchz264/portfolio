import { ImageResponse } from 'next/og';
import { siteHostname } from '@/lib/site';

export const alt = 'Julio Sánchez Aniceto - Junior Web Developer | Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Import messages directly — getTranslations() requires request context
  // which is not available in opengraph-image routes.
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  const name: string = messages.personal_info.full_name;
  const jobTitle: string = messages.personal_info.title;
  const description: string = messages.sections.hero.description;
  const cta = locale === 'es' ? '→ Ver Portfolio' : '→ View Portfolio';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Terminal title bar — decorative, not the headline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '40px',
          }}
        >
          <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ color: '#444444', fontSize: 14, marginLeft: 10 }}>
            juliosn@portfolio:~
          </span>
        </div>

        {/* HEADLINE — name, large and prominent */}
        <div
          style={{
            color: '#ffffff',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-1px',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          {name}
        </div>

        {/* Subtitle — job title */}
        <div
          style={{
            color: '#00ADD8',
            fontSize: 30,
            fontFamily: 'monospace',
            marginBottom: 28,
            display: 'flex',
          }}
        >
          {jobTitle}
        </div>

        {/* Description */}
        <div
          style={{
            color: '#777777',
            fontSize: 19,
            lineHeight: 1.55,
            maxWidth: 820,
            flex: 1,
            display: 'flex',
          }}
        >
          {description}
        </div>

        {/* CTA + footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #1c1c1c',
            paddingTop: 24,
          }}
        >
          {/* Call-to-action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: '#0d1a1a',
              border: '1px solid #00ADD8',
              borderRadius: 8,
              padding: '10px 22px',
            }}
          >
            <span style={{ color: '#39D353', fontSize: 18, fontFamily: 'monospace' }}>
              {siteHostname}
            </span>
            <span style={{ color: '#00ADD8', fontSize: 18, fontFamily: 'monospace' }}>
              {cta}
            </span>
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', gap: 18 }}>
            {['PHP', 'JavaScript', 'Laravel', 'React', 'MySQL'].map(tech => (
              <span
                key={tech}
                style={{ color: '#3a3a3a', fontSize: 15, fontFamily: 'monospace' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
