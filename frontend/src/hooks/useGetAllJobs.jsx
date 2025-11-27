import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/api";
import { setAllAppliedJobs } from "../redux/jobsSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        console.log("🟢 Hook triggered"); // 1️⃣ confirm hook runs

        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );

        console.log("🟡 Full response:", res); // 2️⃣ confirm axios worked
        console.log("🔵 Response data:", res.data); // 3️⃣ confirm backend data

        if (res.data.success) {
          console.log("🟣 Applications key:", res.data.applications); // test exact key
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.error("🔴 Error fetching applied jobs:", error.message);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
