import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal, Building2, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { searchJobByText } = useSelector((store) => store.company);
  const { allAdminJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) return true;
        const companyName = job?.company?.name || job?.name || "";
        return (
          companyName.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            ?.includes(searchJobByText.toLowerCase())
        );
      }) || [];
    setFilterJobs(filteredJobs);
  }, [searchJobByText, allAdminJobs]);

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
      <Table>
        <TableCaption className="text-gray-500 dark:text-gray-400">
          A list of your recent posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-zinc-800/50">
            <TableHead className="w-[200px] text-center">Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
              >
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={job?.company?.logo}
                        alt={job?.company?.name}
                      />
                      <AvatarFallback>
                        <Building2 className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {job?.company?.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {job?.title || "—"}
                </TableCell>

                <TableCell className="text-gray-600 dark:text-gray-400">
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition">
                        <MoreHorizontal size={18} />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-36 p-2 rounded-lg shadow-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                      align="end"
                    >
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition"
                      >
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </div>{" "}
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicant`)
                        }
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition"
                      >
                        <Eye size={16} />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 dark:text-gray-400"
              >
                No jobs posted yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
