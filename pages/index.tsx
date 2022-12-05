import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export default function Home({...props}) {
  return (
    <h2>
      <Link prefetch={false} href={'/test/jobs'}>Go to Jobs</Link>
    </h2>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}