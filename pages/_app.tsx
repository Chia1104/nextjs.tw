import '../styles/globals.css';
import Layout from '../components/Layout';
import { MDXProvider } from '@mdx-js/react';
import TranslatedBy from '@components/TranslatedBy';
import Pagination from '@components/Pagination';
import Card from '@components/Card';
import * as MDXComponents from '@components/MDXComponents';
import PageMeta from '@components/MDXComponents/PageMeta';
import type { AppProps } from 'next/app';

const mdxComponents = {
  Card,
  Pagination,
  PageMeta,
  TranslatedBy,
  blockquote: (props: any) => <blockquote
    className="bg-gray-100 rounded p-4 my-4 border text-stone-600 mdx-component"
    {...props}
  >
    {props.children}
  </blockquote>,
  ...MDXComponents,
};

function MyApp({
  Component,
  pageProps
}: AppProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  );
}

export default MyApp;

