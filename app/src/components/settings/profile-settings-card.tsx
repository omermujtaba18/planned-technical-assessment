"use client";

import { userProfileSchema } from "@/forms/schemas/user";
import { useUserStore } from "@/store/userStore";
import { Formik, Form } from "formik";
import { ChangeEvent, useRef } from "react";
import { ServerError } from "../shared/server-error";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { patchUserAction } from "@/forms/actions/user";
import { Textarea } from "../ui/textarea";

export const ProfileSettingCard: React.FC = () => {
  const { user } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue("profilePicture", event?.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <section id="profile-setting" className="mb-4">
      <Card className="flex flex-col gap-4 shadow-none">
        <h2 className="text-lg text-gray-900 font-bold">Profile Settings</h2>
        <Formik
          initialValues={user}
          validationSchema={userProfileSchema.validationSchema}
          onSubmit={patchUserAction}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            status,
            handleSubmit,
            handleChange,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16">
                    <AvatarImage src={values.profilePicture} />
                    <AvatarFallback>
                      {user?.fullName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                  >
                    Change Photo
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    hidden
                  />
                </div>
                <div className="gap-2 max-w-sm flex flex-col">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={values.email}
                    disabled
                  />
                </div>
                <div className="gap-2 max-w-sm flex flex-col">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    type="text"
                    id="fullName"
                    defaultValue={user?.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  <p className="text-red-600 text-sm">
                    {errors.fullName && touched.fullName && errors.fullName}
                  </p>
                </div>
                <div className="gap-2 max-w-sm flex flex-col">
                  <Label htmlFor="fullName">Memory Lane Description</Label>
                  <Textarea
                    id="memoryLaneDescription"
                    placeholder="Enter your memory lane description"
                    rows={5}
                    maxLength={200}
                    onChange={handleChange}
                    defaultValue={values.memoryLaneDescription}
                  />
                  <p className="text-red-600 text-sm">
                    {errors.memoryLaneDescription &&
                      touched.memoryLaneDescription &&
                      errors.memoryLaneDescription}
                  </p>
                </div>
                <ServerError status={status} />
              </div>

              <Button
                className="max-w-fit"
                size="lg"
                disabled={isSubmitting}
                type="submit"
              >
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </section>
  );
};
