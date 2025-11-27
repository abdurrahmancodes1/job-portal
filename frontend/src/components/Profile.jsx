import React, { useState } from "react";
import Navbar from "./ui/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJob";

const Profile = () => {
  useGetAppliedJobs();
  console.log("This calling from her", useGetAppliedJobs);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = !!user?.profile?.resume;

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-10 p-8 shadow-sm">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-gray-300">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto
                    ? `${user.profile.profilePhoto}?tr=w-650,h-650,fo-face,cm-extract,q-90,f-auto`
                    : "/default-avatar.png"
                }
                alt="Profile"
              />
              <AvatarFallback>
                {user?.fullName?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-semibold text-2xl text-gray-800">
                {user?.fullName || "Unnamed User"}
              </h1>
              <p className="text-gray-500 mt-2 max-w-md leading-relaxed">
                {user?.profile?.bio || "No bio added yet."}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <Pen className="h-4 w-4" />
            Edit
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-4">
          <div className="flex items-center gap-2 my-2">
            <Mail />
            <span>{user?.email || "No email available"}</span>
          </div>
          <div className="flex items-center gap-2 my-2">
            <Contact />
            <span>{user?.phoneNumber || "No phone number added"}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h1 className="font-semibold text-lg text-gray-800">Skills</h1>
          <div className="flex flex-wrap items-center gap-2 my-3">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-500">No resume added yet</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
