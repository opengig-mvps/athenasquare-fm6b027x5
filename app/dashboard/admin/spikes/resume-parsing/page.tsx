'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const ResumeParsingResearchPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [researchData, setResearchData] = useState<any>(null);

  useEffect(() => {
    const fetchResearchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/research/resume-parsing');
        setResearchData(res?.data?.data); // Assuming the response data format
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? 'Something went wrong');
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchResearchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><LoaderCircleIcon className="animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Resume Parsing Research</h1>
      <Card>
        <CardHeader>
          <CardTitle>Research Findings</CardTitle>
          <CardDescription>
            This page documents the research on existing resume parsing solutions and APIs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {researchData ? (
            <>
              <Alert>
                <AlertTitle>Feasibility Report</AlertTitle>
                <AlertDescription>{researchData?.feasibilityReport}</AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Technical Requirements</AlertTitle>
                <AlertDescription>{researchData?.technicalRequirements}</AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Potential Challenges</AlertTitle>
                <AlertDescription>{researchData?.potentialChallenges}</AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Effort and Cost Estimates</AlertTitle>
                <AlertDescription>{researchData?.effortCostEstimates}</AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Accuracy and Reliability</AlertTitle>
                <AlertDescription>{researchData?.accuracyReliability}</AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Compliance with Data Privacy Regulations</AlertTitle>
                <AlertDescription>{researchData?.dataPrivacyCompliance}</AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Potential Benefits for HRs</AlertTitle>
                <AlertDescription>{researchData?.hrBenefits}</AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Recommendations for Next Steps</AlertTitle>
                <AlertDescription>{researchData?.recommendations}</AlertDescription>
              </Alert>
            </>
          ) : (
            <p>No research data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeParsingResearchPage;