import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { COMPANY_API_END_POINT } from "../../utils/api";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message || "Company created successfully!");
        const companyId = res.data.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Navbar />

      <div className="flex justify-center items-center py-12">
        <Card className="w-full max-w-2xl shadow-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Your Company
            </CardTitle>
            <CardDescription className="text-gray-500">
              What would you like to name your company? You can change it later.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="companyName"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  className="mt-2"
                  placeholder="e.g., JobHunt, Microsoft, AI Labs"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-zinc-800">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                >
                  Cancel
                </Button>
                <Button onClick={registerNewCompany}>Continue</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateCompany;
