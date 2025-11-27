// LatestJobs.jsx
import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const navigate = useNavigate();
  const { allJobs } = useSelector((store) => store.job);
  return (
    <section className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-purple-800">Latest & Top </span>
        Job Openings
      </h1>

      <p className="text-gray-500 text-center mt-3 max-w-2xl mx-auto">
        Explore the newest and most popular job opportunities handpicked for
        you.
      </p>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
        {allJobs.map((item, index) => (
          <LatestJobCards
            key={index}
            item={item}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestJobs;
