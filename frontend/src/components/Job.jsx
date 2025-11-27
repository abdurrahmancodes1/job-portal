import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ item, index }) => {
  console.log(item);
  const navigate = useNavigate();
  // console.log(item);
  // const jobId = "123";
  console.log(item);
  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "Unknown";

    const createdAt = new Date(mongodbTime);
    if (isNaN(createdAt.getTime())) return "Invalid date";

    const now = new Date();
    const diffInMs = now.getTime() - createdAt.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  return (
    <div className="p-6 w-full rounded-2xl shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>{daysAgoFunction(item?.createdAt)}</p>
        <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-900 hover:text-white transition-colors duration-200">
          <Bookmark size={18} />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={`${item?.company?.logo}`} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-900">{item?.company?.name}</h2>
          <p className="text-sm text-gray-500">{item?.company?.location}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-4">
        <h1 className="font-bold text-lg text-gray-900">{item?.title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed mt-1">
          {item?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-3 mt-5">
        <Badge
          variant="secondary"
          className="bg-blue-50 text-blue-700 font-semibold"
        >
          {item?.position}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-orange-50 text-orange-700 font-semibold"
        >
          {item?.jobType}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-purple-50 text-purple-700 font-semibold"
        >
          INR {item?.salary}
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap sm:flex-nowrap gap-3 mt-6">
        <Button
          onClick={() => navigate(`/description/${item._id}`)}
          className="bg-purple-700 hover:bg-purple-800 text-white w-full sm:w-auto"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
