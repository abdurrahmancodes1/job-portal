import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../ui/shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/api";
import { toast } from "sonner";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SetUpCompany = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false); // 👈 local loading state

  const { singleCompany } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const fileChangeHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // s
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
        formData.append("file", input.file);
      }
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Company details updated!");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error("Error updating company:", error);

      const errMsg =
        error?.response?.data?.message ||
        "Something went wrong while updating the company.";
      toast.error(errMsg);
    } finally {
      setLoading(false); // stop loading
    }

    // 👉 You can call API here to upload details
  };
  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || "",
    });
  }, [singleCompany]);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Navbar />

      <div className="max-w-3xl mx-auto py-10 px-4">
        <Card className="shadow-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={18} />
                Back
              </Button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Company Setup
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="e.g., TechNova"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="City, Country"
                />
              </div>

              <div>
                <Label htmlFor="file">Company Logo</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    className="cursor-pointer"
                  />
                  {input.file && (
                    <span className="text-sm text-gray-500 truncate w-32">
                      {input.file.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                name="description"
                rows="4"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Write a short description about your company..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </Button>
              <Button type="submit" className="min-w-[120px]">
                Save & Continue
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SetUpCompany;
