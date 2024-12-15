"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { LoaderCircleIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const notificationSchema = z.object({
  applicationSubmission: z.boolean(),
  statusChange: z.boolean(),
  interviewScheduling: z.boolean(),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

const NotificationPreferences: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<NotificationFormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
  });

  useEffect(() => {
    if (!session) return;
    const fetchPreferences = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}/notification-preferences`);
        setInitialData(res?.data?.data);
        setValue("applicationSubmission", res?.data?.data?.applicationSubmission);
        setValue("statusChange", res?.data?.data?.statusChange);
        setValue("interviewScheduling", res?.data?.data?.interviewScheduling);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPreferences();
  }, [session, setValue]);

  const onSubmit = async (data: NotificationFormData) => {
    try {
      const response = await axios.post(`/api/users/${session?.user?.id}/notification-preferences`, data);
      if (response?.data?.success) {
        toast.success("Preferences updated successfully!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (loading || !initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Email Notification Preferences</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Manage Your Email Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="applicationSubmission">Application Submission</Label>
              <Checkbox
                {...register("applicationSubmission")}
                id="applicationSubmission"
                className="ml-2"
                defaultChecked={initialData?.applicationSubmission}
              />
              {errors?.applicationSubmission && (
                <p className="text-red-500 text-sm">{errors?.applicationSubmission?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="statusChange">Status Change</Label>
              <Checkbox
                {...register("statusChange")}
                id="statusChange"
                className="ml-2"
                defaultChecked={initialData?.statusChange}
              />
              {errors?.statusChange && (
                <p className="text-red-500 text-sm">{errors?.statusChange?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interviewScheduling">Interview Scheduling</Label>
              <Checkbox
                {...register("interviewScheduling")}
                id="interviewScheduling"
                className="ml-2"
                defaultChecked={initialData?.interviewScheduling}
              />
              {errors?.interviewScheduling && (
                <p className="text-red-500 text-sm">{errors?.interviewScheduling?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Updating Preferences...
                </>
              ) : (
                "Update Preferences"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NotificationPreferences;