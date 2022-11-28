import axios from "axios";
import React from "react";

export function useFetch({ url, jobTitle, location }) {
  const { useState, useEffect } = React;
  console.log(React)
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  //Remove all non-numeric characters

  const dateStringToNumber = (date) => {
    const dateNumber = date.replace(/\D/g, "");
    return parseInt(dateNumber);
  }

  useEffect(() => {
    axios.post(url, {
      companySkills: true,
      dismissedListingHashes: [],
      fetchJobDesc: true,
      jobTitle: 'Business Analyst',
      locations: [''],
      numJobs: 20,
      previousListingHashes: []
    }).then((response) => {
      const cleanJobs = response.data.jobs.map((item) => {
        const daysAgo = dateStringToNumber(item.postedDate)
        return {
          jobTitle: item.jobTitle,
          companyName: item.companyName,
          jobdesc: item.jobDescription,
          daysAgo
        }
      })

      setJobs(cleanJobs)
      setData(response.data.jobs)
    }).finally(() => {
      setLoading(false);
    })
    
  }, [])

  return {data, jobs, loading};
}