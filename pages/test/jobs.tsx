import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { JobCard } from '../../src/components/JobCard';
import { Loader } from '../../src/components/Loader';

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

const isServerReq = (req: any) => !req.url.startsWith('/_next');

export default function Jobs({ jobs, loading } : HomeProps) {
  const [search, setSearch] = useState('')
  const [filteredJobs, setFilteredJobs] = useState<IPost[]>(jobs)
  
  const last7DaysFilter = () => {
    setFilteredJobs(jobs.filter((job) => {
      return job.daysAgo <= 7
    }))
  }

  // Filter jobs by Company Name
  useEffect(() => {
    const newFilteredJobs = jobs.filter((job) => job.companyName.toLowerCase().includes(search.toLowerCase()))
    setFilteredJobs(newFilteredJobs)
  }, [search, jobs])

  return (
    (
      <Box sx={{ margin: '60px', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h1' sx={{ fontSize: '24px' }}>
          <Link href={'/'}>
            Home
          </Link> 
        </Typography >
  
        <Box sx={{ display: 'flex', gap: '16px', mt: '24px' }}>
          <Input
            placeholder="Search by company name"
            inputProps={{ 'aria-label': 'search by company name' }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
  
          <Button
            variant="contained"
            sx={{ ml: '8px' }}
            onClick={last7DaysFilter}
          >Last 7 days</Button>
        </Box>
        
        { loading ? <Loader /> : null }
        
        <List>
          {filteredJobs.map((item, index) => {
            return index < 10 ? (
              <ListItem sx={{paddingLeft: '0px'}} key={index}>
                <JobCard companyName={item.companyName} jobTitle={item.jobTitle} description={item.jobdesc} index={index} />    
              </ListItem>
            ) : null
          })}
        </List>
      </Box>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req  }) => {

  const dateStringToNumber = (date: string) => {
    const dateNumber = date.replace(/\D/g, "");
    return parseInt(dateNumber);
  }

  const data = isServerReq(req) ? await fetch('https://www.zippia.com/api/jobs/', {
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
  }) : null

  const jsonData = await data?.json();

  const cleanJobs = jsonData?.jobs.map((item: any) => {
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
      jobs: cleanJobs,
      loading: false 
    }
  }
}