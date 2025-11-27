import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ item }) => {
  // Fallback in case company is missing
  const companyName = item.company?.name || "Unknown Company";
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${item._id}`)}
      className="p-6 rounded-2xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Company Info */}
      <div>
        <h1 className="font-semibold text-lg text-gray-800">{companyName}</h1>
        <p className="text-sm text-gray-500">{item.location || "India"}</p>
      </div>

      {/* Job Info */}
      <div className="mt-3">
        <h2 className="font-bold text-xl text-gray-900 mb-1">{item.title}</h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Job Tags */}
      <div className="flex flex-wrap items-center gap-3 mt-5">
        <Badge
          variant="secondary"
          className="bg-blue-50 text-blue-700 font-semibold"
        >
          {item.position || "N/A"}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-orange-50 text-orange-700 font-semibold"
        >
          {item.jobType || "N/A"}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-purple-50 text-purple-700 font-semibold"
        >
          {item.salary ? `${item.salary / 100000} LPA` : "N/A"}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
