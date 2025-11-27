import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/api";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.file,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    if (input.skills?.length) {
      input.skills.forEach((skill) => formData.append("skills[]", skill));
    }
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    console.log(input);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <form onSubmit={submitHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={input.fullName}
                    id="fullName"
                    name="fullName"
                    onChange={changeEventHandler}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={input.email}
                    onChange={changeEventHandler}
                    id="email"
                    name="email"
                    className="col-span-3"
                  />
                </div>{" "}
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    onChange={changeEventHandler}
                    value={input.phoneNumber}
                    id="phoneNumber"
                    name="phoneNumber"
                    className="col-span-3"
                  />
                </div>{" "}
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    onChange={changeEventHandler}
                    value={input.bio}
                    id="bio"
                    name="bio"
                    className="col-span-3"
                  />
                </div>{" "}
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    value={input.skills?.join(",") || ""}
                    id="skills"
                    name="skills"
                    className="col-span-3"
                    onChange={(e) =>
                      setInput({
                        ...input,
                        skills: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="file">Resume</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    name="file"
                    onChange={fileChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full mb-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Updating
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
