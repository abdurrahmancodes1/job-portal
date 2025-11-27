import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobsSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center mt-16">
      <div className="flex flex-col gap-10">
        <span className="px-4 py-2 mx-auto rounded-full bg-gray-100 text-orange-600 font-medium ">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold ">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-purple-800  ">Dream Jobs</span>
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem</p>
        <div className=" flex w-[40%] mx-auto shadow-lg border border-gray-300 rounded-full items-center gap-4 ">
          <input
            className="p-2 outline-none border-none w-full "
            type="text"
            placeholder="Find your dream job"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-purple-800"
          >
            <Search className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
