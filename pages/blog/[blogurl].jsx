import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import DisplayPosts from '../../components/displayposts';
import Head from 'next/head';
import IntroText from '../../components/introText';

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
      url: `http://localhost:3000/api/getbloginfopublic?sitename=${params.blogurl}`,
      headers: {},
    };
    const res = await axios(config);
    const data = res.data;
    console.log(data);
    return {
      props: {
        siteInfo: data.siteInfo,
        posts: data.posts,
      },
    };
  } catch (error) {
    console.log(error.response.data.error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
const BlogHome = ({ siteInfo, posts }) => {
  const router = useRouter();

  if (router.isFallback) return <h2>Loading...</h2>;
  return (
    <>
      <Head>
        <title>{siteInfo.title}</title>
      </Head>
      <header>
        <div className='wrapper max-w-7xl mx-auto mb-5'>
          <IntroText
            title={siteInfo.title}
            description={siteInfo.description}
          />
        </div>
      </header>
      <div className='wrapper max-w-7xl mx-auto mb-5'>
        <DisplayPosts posts={posts} />
      </div>
    </>
  );
};

export default BlogHome;
