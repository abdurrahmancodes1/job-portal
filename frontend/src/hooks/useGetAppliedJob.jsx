import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/api";
import { setAllAppliedJobs } from "../redux/jobsSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // Prevents dispatch after unmount

    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success && isMounted) {
          console.log("Fetched applied jobs:", res.data.applications);
          dispatch(setAllAppliedJobs(res.data.applications));
        } else if (!res.data.success) {
          console.warn("Failed to fetch applied jobs:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error.message);
      }
    };

    fetchAppliedJobs();

    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, [dispatch]);
};

export default useGetAppliedJobs;
