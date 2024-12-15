'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoaderCircleIcon } from 'lucide-react';

const ApplicationDetailPage = () => {
  const { applicationId } = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [application, setApplication] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [statusHistory, setStatusHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!session) return;

    const fetchApplication = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/hr/applications/${applicationId}`);
        setApplication(res.data?.data);
        setStatus(res.data?.data?.status);
        setStatusHistory(res.data?.data?.statusHistory);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [session, applicationId]);

  const updateStatus = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/api/hr/applications/${applicationId}/status`, { status });
      if (res.data?.success) {
        toast.success("Status updated successfully!");
        setStatusHistory([...statusHistory, { status, updatedAt: new Date().toISOString() }]);
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Application Details</h2>
      <Card>
        <CardHeader>
          <CardTitle>Application Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="candidateName">Candidate Name</Label>
            <p>{application?.candidateName}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <p>{application?.position}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Current Status</Label>
            <Select value={status} onValueChange={(e: any) => setStatus(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={updateStatus} disabled={loading}>
            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Update Status"}
          </Button>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold mt-8 mb-4">Status History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statusHistory?.map((history: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{history?.status}</TableCell>
              <TableCell>{new Date(history?.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationDetailPage;