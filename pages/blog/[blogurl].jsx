import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import DisplayPosts from '../../components/displayposts';
import Head from 'next/head';
import IntroText from '../../components/introText';
import FeaturedPost from '../../components/featuredPost';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const config = {
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_URL}/api/getbloginfopublic?sitename=${params.blogurl}`,
      headers: {},
    };
    const res = await axios(config);

    const posts = res.data.posts;
    console.log(posts);
    const siteInfo = res.data.siteInfo;
    console.log(siteInfo);
    const featuredPost = res.data.featuredPost;
    console.log(featuredPost);
    return {
      props: {
        posts,
        siteInfo,
        featuredPost,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
const BlogHome = ({ siteInfo, posts, featuredPost }) => {
  const router = useRouter();

  if (router.isFallback) return <Loading />;
  return (
    <>
      <Head>
        <title>{siteInfo.title}</title>
      </Head>
      <header>
        <div className='wrapper max-w-7xl mx-auto mb-5 w-10/12'>
          <IntroText
            title={siteInfo.title}
            description={siteInfo.description}
          />
        </div>
      </header>
      <div className='wrapper max-w-7xl mx-auto mb-5 w-10/12'>
        {featuredPost && (
          <FeaturedPost post={featuredPost} url={siteInfo.url} />
        )}
        <DisplayPosts posts={posts} url={siteInfo.url} />
      </div>
      <Footer title={siteInfo.title} />
    </>
  );
};

export default BlogHome;
