import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/companySlice";
import { setAllAdminJobs } from "../redux/jobsSlice";
import { JOB_API_END_POINT } from "../utils/api";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);

  return <div>useGetAllAdminJobs</div>;
};

export default useGetAllAdminJobs;
