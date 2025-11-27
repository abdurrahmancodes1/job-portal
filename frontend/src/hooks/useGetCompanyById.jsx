import axios from "axios";
import React, { useEffect } from "react";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "../utils/api";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobsSlice";
import { setSingleCompany } from "../redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);

  return <div>useGetCompanyById</div>;
};

export default useGetCompanyById;
