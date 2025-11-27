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
import { Edit2, MoreHorizontal, Building2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSingleCompany } from "../../redux/companySlice";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
      <Table>
        <TableCaption className="text-gray-500 dark:text-gray-400">
          A list of your recently registered companies
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-zinc-800/50">
            <TableHead className="w-[80px] text-center">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany && filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
              >
                <TableCell className="text-center">
                  <Avatar className="mx-auto">
                    <AvatarImage
                      className="h-10 w-10 rounded-full object-contain"
                      src={
                        company.logo ||
                        "https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                      }
                      alt={company.name}
                    />
                    <AvatarFallback>
                      <Building2 size={18} />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {company.name}
                </TableCell>

                <TableCell className="text-gray-600 dark:text-gray-400">
                  {new Date(company.createdAt).toLocaleDateString()}
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
                        onClick={() => {
                          dispatch(setSingleCompany(company));
                          navigate(`/admin/companies/${company._id}`);
                        }}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition"
                      >
                        <Edit2 size={16} />
                        <span>Edit</span>
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
                No company registered yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
