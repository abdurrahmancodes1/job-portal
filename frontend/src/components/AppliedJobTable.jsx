import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  console.log(allAppliedJobs[0].name);
  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No jobs applied yet.</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(item.job.createdAt).toLocaleDateString("en-IN")}
              </TableCell>
              <TableCell>{item.job.title || "N/A"}</TableCell>
              <TableCell>{item.job.company.name || "N/A"}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    item?.status === "rejected"
                      ? "bg-red-400"
                      : item.status === "pending"
                      ? "bg-gray-400"
                      : "bg-green-400"
                  }`}
                >
                  {item.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
