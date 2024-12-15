'use client';

import React, { useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { LoaderCircleIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ApplicationsPage = () => {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('date');
  const [filterByStatus, setFilterByStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}/applications`);
        setApplications(res?.data?.data);
      } catch (error: any) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? 'Something went wrong');
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [session]);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e?.target?.value);
  };

  const filteredApplications = applications?.filter((app: any) => {
    return (
      (filterByStatus === 'All' || app?.status === filterByStatus) &&
      (searchQuery === '' || app?.name?.toLowerCase().includes(searchQuery?.toLowerCase()))
    );
  });

  const sortedApplications = filteredApplications?.sort((a: any, b: any) => {
    if (sortBy === 'date') return new Date(b?.date).getTime() - new Date(a?.date).getTime();
    if (sortBy === 'name') return a?.name?.localeCompare(b?.name);
    return 0;
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Job Applications</h2>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search by applicant name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Select value={filterByStatus} onValueChange={(e: any) => setFilterByStatus(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(e: any) => setSortBy(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Applications List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date of Application</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    <LoaderCircleIcon className="animate-spin" />
                  </TableCell>
                </TableRow>
              ) : (
                sortedApplications?.map((app: any) => (
                  <TableRow key={app?.id}>
                    <TableCell>{app?.name}</TableCell>
                    <TableCell>{app?.position}</TableCell>
                    <TableCell>{app?.status}</TableCell>
                    <TableCell>{new Date(app?.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsPage;