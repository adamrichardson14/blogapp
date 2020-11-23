import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import DisplayPosts from '../../components/displayposts';
import Head from 'next/head';
import IntroText from '../../components/introText';
import FeaturedPost from '../../components/featuredPost';
import Footer from '../../components/Footer';
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

    const posts = res.data.posts;
    console.log(posts);
    const featuredPost = posts.find((post) => post.featured);
    console.log(featuredPost);
    const siteInfo = res.data.siteInfo;
    console.log(siteInfo);
    return {
      props: {
        posts: featuredPost
          ? posts.filter((post) => post.slug != featuredPost.slug)
          : posts,
        featuredPost: featuredPost ? featuredPost : null,
        siteInfo,
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
const BlogHome = ({ siteInfo, posts, featuredPost }) => {
  const router = useRouter();

  if (router.isFallback) return <h2>Loading...</h2>;
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
        <FeaturedPost post={featuredPost} />
        <DisplayPosts posts={posts} />
      </div>
      <Footer title={siteInfo.title} />
    </>
  );
};

export default BlogHome;
