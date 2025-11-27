import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { MapPin, Briefcase, IndianRupee } from "lucide-react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobsSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [isAppliedLocal, setIsAppliedLocal] = useState(false); // 👈 Local UI state

  const isApplied =
    isAppliedLocal ||
    singleJob?.application?.some(
      (app) => String(app.applicant?._id || app.applicant) === String(user?._id)
    ) ||
    false;

  // ✅ Fetch job details
  const fetchSingleJob = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Apply for job
  const applyJobHandler = async () => {
    try {
      setApplying(true);
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsAppliedLocal(true); // 👈 Instantly update UI

        // Refresh job data to update applications list
        const updated = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (updated.data.success) {
          dispatch(setSingleJob(updated.data.job));
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchSingleJob();
  }, [jobId]);

  // ⏳ Loading Screen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading job details...
        </p>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-red-500 text-lg">Job not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {singleJob.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full"
              >
                <Briefcase className="w-4 h-4 mr-1 inline" />
                {singleJob.position}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800 font-medium px-3 py-1 rounded-full"
              >
                <MapPin className="w-4 h-4 mr-1 inline" />
                {singleJob.jobType}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-full"
              >
                <IndianRupee className="w-4 h-4 mr-1 inline" />
                {`${(singleJob.salary / 100000).toFixed(1)} LPA`}
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied || applying}
            className={`w-full md:w-auto px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200 ${
              isApplied
                ? "bg-gray-400 text-gray-700 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            }`}
          >
            {applying
              ? "Applying..."
              : isApplied
              ? "Already Applied"
              : "Apply Now"}
          </Button>
        </div>

        {/* Job Description Section */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Job Description
          </h2>
          <div className="flex flex-col gap-2">
            <h2>
              <strong className="mr-2">Role:</strong> {singleJob.position}
            </h2>
            <h2>
              <strong className="mr-2">Location:</strong> {singleJob.location}
            </h2>
            <h2>
              <strong className="mr-2">Description:</strong>{" "}
              {singleJob.description}
            </h2>
            <h2>
              <strong className="mr-2">Experience:</strong>{" "}
              {singleJob.experience || "Not specified"}
            </h2>
            <h2>
              <strong className="mr-2">Total Applicants:</strong>{" "}
              {singleJob.application?.length || 0}
            </h2>
            <h2>
              <strong className="mr-2">Posted Date:</strong>{" "}
              {new Date(singleJob.createdAt).toLocaleDateString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
