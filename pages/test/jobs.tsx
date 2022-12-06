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
import { useFetch } from '../../src/api/useFetch';

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
  const [pageLoading, setPageLoading] = useState(true);
  const [search, setSearch] = useState('')
  const [filteredJobs, setFilteredJobs] = useState<IPost[]>(jobs)
  
  const last7DaysFilter = () => {
    setFilteredJobs(jobs?.filter((job) => {
      return job.daysAgo <= 7
    }))
  }

  // Filter jobs by Company Name
  useEffect(() => {
    if(jobs){
      const newFilteredJobs = jobs?.filter((job) => job.companyName.toLowerCase().includes(search.toLowerCase()))
      setPageLoading(false)
      setFilteredJobs(newFilteredJobs)
    } else {
      window.location.reload()
    }
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
        
        { pageLoading ? <Loader /> : null }
        
        <List>
          {filteredJobs?.map((item, index) => {
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

  const jobsData = isServerReq(req) ? await useFetch({ url: 'https://www.zippia.com/api/jobs/', jobTitle: 'Business Analyst', location: '' }) : null
  const [jobs, loading] = jobsData?.jobs ? [jobsData.jobs, jobsData.loading] : [null, true]
  
  return {
    props: {
      jobs,
      loading
    }
  }
}