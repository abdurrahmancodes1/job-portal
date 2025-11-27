import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/api";
import { setUser } from "../../../redux/authSlice";
import { toast } from "sonner";
const Navbar = () => {
  // const user = false;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white mx-auto h-16 flex items-center justify-between px-6 shadow">
      {/* Logo */}
      <h1 className="text-2xl font-bold">
        Job<span className="text-orange-600">Portal</span>
      </h1>

      {/* Navigation links + user avatar */}
      <div className="flex items-center gap-6">
        {/* Nav Links */}
        <ul className="flex gap-6 text-lg font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li>
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="hover:text-orange-600 transition-colors"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="hover:text-orange-600 transition-colors"
                >
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>
        {!user ? (
          <div className="flex gap-5 ">
            <Link to="/login">
              <Button variant="outline" className="cursor-pointer">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="cursor-pointer bg-purple-700 hover:bg-purple-500">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={`${user.profile.profilePhoto}?tr=w-650,h-650,fo-face,cm-extract,q-90,f-auto`}
                  alt="@shadcn"
                />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-72 p-4">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage
                    src={`${user.profile.profilePhoto}?tr=w-650,h-650,fo-face,cm-extract,q-90,f-auto`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Abdur Rahman</h4>
                  <p className="text-sm text-muted-foreground truncate w-48">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                {user && user.role === "student" && (
                  <div>
                    <Button
                      variant="link"
                      className="cursor-pointer justify-start"
                    >
                      <Link to="/profile">
                        <User2 /> View Profile
                      </Link>
                    </Button>
                  </div>
                )}
                <div>
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="cursor-pointer justify-start"
                  >
                    <LogOut /> Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
        {/* User Popover */}
      </div>
    </div>
  );
};

export default Navbar;
