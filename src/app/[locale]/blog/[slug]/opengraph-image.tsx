import { ImageResponse } from 'next/og';
import { getAllPosts, getPostBySlug } from '@/lib/blog/posts';
import { isValidLocale } from '@/lib/blog/utils';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const params: { locale: string; slug: string }[] = [];

  posts.forEach(post => {
    params.push({ locale: 'en', slug: post.slug.en });
    params.push({ locale: 'es', slug: post.slug.es });
  });

  return params;
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return new Response('Not found', { status: 404 });
  }

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const { metadata } = post;
  const title = metadata.title[locale as 'en' | 'es'];
  const description = metadata.description[locale as 'en' | 'es'];
  const tags = metadata.tags.slice(0, 4);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ color: '#555555', fontSize: 15, marginLeft: 10, fontFamily: 'monospace' }}>
            juliosn@portfolio:~/blog
          </span>
        </div>

        {/* Prompt */}
        <div
          style={{
            color: '#00ADD8',
            fontSize: 20,
            fontFamily: 'monospace',
            marginBottom: 32,
            display: 'flex',
          }}
        >
          $ cat post.mdx
        </div>

        {/* Post title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: title.length > 60 ? 42 : 52,
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: 24,
            display: 'flex',
            flex: 1,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            color: '#888888',
            fontSize: 19,
            lineHeight: 1.5,
            maxWidth: 900,
            marginBottom: 28,
            display: 'flex',
          }}
        >
          {description}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
            {tags.map(tag => (
              <span
                key={tag}
                style={{
                  color: '#00ADD8',
                  fontSize: 16,
                  fontFamily: 'monospace',
                  display: 'flex',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

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
            juliosn.dev/blog
          </span>
          <span style={{ color: '#555555', fontSize: 16, fontFamily: 'monospace' }}>
            Julio Sánchez Aniceto
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
