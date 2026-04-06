import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'Julio Sánchez Aniceto - Portfolio';
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
  const t = await getTranslations({ locale });

  const name = t('personal_info.full_name');
  const title = t('personal_info.title');
  const description = t('sections.hero.description');

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Terminal title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ color: '#555555', fontSize: 15, marginLeft: 10, fontFamily: 'monospace' }}>
            juliosn@portfolio:~
          </span>
        </div>

        {/* Prompt */}
        <div
          style={{
            color: '#00ADD8',
            fontSize: 22,
            fontFamily: 'monospace',
            marginBottom: 28,
            display: 'flex',
          }}
        >
          $ cat about.txt
        </div>

        {/* Name */}
        <div
          style={{
            color: '#ffffff',
            fontSize: 68,
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: 18,
            display: 'flex',
          }}
        >
          {name}
        </div>

        {/* Title */}
        <div
          style={{
            color: '#00ADD8',
            fontSize: 34,
            fontFamily: 'monospace',
            marginBottom: 28,
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            color: '#888888',
            fontSize: 20,
            lineHeight: 1.55,
            maxWidth: 840,
            display: 'flex',
            flex: 1,
          }}
        >
          {description}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #1a1a1a',
            paddingTop: 24,
          }}
        >
          <span style={{ color: '#39D353', fontSize: 20, fontFamily: 'monospace' }}>
            juliosn.dev
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['PHP', 'JavaScript', 'Laravel', 'React', 'MySQL'].map(tech => (
              <span key={tech} style={{ color: '#444444', fontSize: 15, fontFamily: 'monospace' }}>
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
