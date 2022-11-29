import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export default function Home() {
  
  return (
    <h2>
      <Link href={'/test/jobs'}>Go to Jobs</Link>
    </h2>
  )
}