import React, { useEffect, useState } from "react";
import Navbar from "./ui/shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAllJobs } from "../redux/jobsSlice";
import { JOB_API_END_POINT } from "../utils/api";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (!searchedQuery) {
      setFilterJobs(allJobs);
      return;
    }

    const query = searchedQuery.toLowerCase();

    const filteredJobs = allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
    );

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  // 👇 Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        dispatch(setAllJobs(res.data.jobs)); // save jobs to redux
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // 👇 Only fetch if no jobs already in redux (prevents duplicate fetch)
    if (allJobs.length === 0) {
      fetchJobs();
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {allJobs.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((item, index) => (
                  <Job key={index} item={item} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
