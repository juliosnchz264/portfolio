// TODO: Re-enable BlogSection once blog is ready for release
// import BlogSection from '@/components/blog/BlogSection';
import Layout from '@/components/layout/Layout';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
// import { getRecentPosts } from '@/lib/blog/posts';

interface HomeProps {
  params: Promise<{ locale: 'en' | 'es' }>;
}

export default async function Home({ params }: HomeProps) {
  await params;

  // TODO: Re-enable when blog is ready
  // const { locale } = await params;
  // const recentPostsData = await getRecentPosts(5);
  // const recentPosts = recentPostsData.map(post => ({
  //   slug: post.slug[locale],
  //   title: post.title[locale],
  //   date: post.publishedAt,
  //   readingTime: post.readingTime[locale],
  // }));

  return (
    <Layout>
      <main className="" role="main" aria-label="Portfolio content">
        <About />
        <Experience />
        <Skills />
        {/* TODO: Re-enable BlogSection once blog is ready */}
        {/* <BlogSection recentPosts={recentPosts} locale={locale} /> */}
        <Contact />
      </main>
    </Layout>
  );
}
