import React, { useEffect } from "react";
import Navbar from "./ui/shared/Navbar";
import Job from "./Job";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobsSlice";
const randomJobs = [1, 2, 3];
const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  });
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results {allJobs.length}{" "}
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((item, index) => {
            return <Job item={item} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
