import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface HomeProps {
  data: any;
  jobs: IPost[];
  loading: boolean;
}
export type IPost = {
  jobTitle: string
  companyName: string
  jobdesc: string
  daysAgo: number
}

export default function Home({ data, jobs, loading } : HomeProps) {
  
  return (
    <h2>
      <Link href={'/test/jobs'}>Go to Jobs</Link>
    </h2>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const dateStringToNumber = (date: string) => {
    const dateNumber = date.replace(/\D/g, "");
    return parseInt(dateNumber);
  }

  const data = await fetch('https://www.zippia.com/api/jobs/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      companySkills: true,
      dismissedListingHashes: [],
      fetchJobDesc: true,
      jobTitle: 'Business Analyst',
      locations: [''],
      numJobs: 20,
      previousListingHashes: []
    })
  })

  const jsonData = await data.json();

  const cleanJobs = jsonData.jobs.map((item: any) => {
    const daysAgo = dateStringToNumber(item.postedDate)
    return {
      jobTitle: item.jobTitle,
      companyName: item.companyName,
      jobdesc: item.jobDescription,
      daysAgo
    }
  })
  
  return { 
    props: {
      data: jsonData, 
      jobs: cleanJobs, 
      cleanJobs, 
      loading: false 
    },
    revalidate: 60
  }
}