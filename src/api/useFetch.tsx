import axios from "axios";

interface useFetchProps {
  url: string;
  jobTitle: string;
  location: string;
}

export async function useFetch({ url, jobTitle, location } : useFetchProps) {
    
  const dateStringToNumber = (date: string) => {
    const dateNumber = date.replace(/\D/g, "");
    return parseInt(dateNumber);
  }

  const data = await axios.post(url, {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: 'Business Analyst',
    locations: [''],
    numJobs: 20,
    previousListingHashes: []
  }).then((res) => res.data)

  const cleanJobs = data?.jobs.map((item: any) => {
    const daysAgo = dateStringToNumber(item.postedDate)
    return {
      jobTitle: item.jobTitle,
      companyName: item.companyName,
      jobdesc: item.jobDescription,
      daysAgo
    }
  })
  
  return {
    jobs: cleanJobs,
    loading: false,
  };
}