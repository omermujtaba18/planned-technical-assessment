"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useUIStore } from "@/store/uiStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Image as ImageLucide, Trash2 } from "lucide-react";
import { Form, Formik } from "formik";
import { createMemorySchema } from "@/forms/schemas/memory";
import { createMemoryAction } from "@/forms/actions/memory";
import { ServerError } from "./server-error";
import { useRef } from "react";
import Image from "next/image";
import { IMemoryMedia } from "@/interfaces/memory-media";

export const MemoryDialog = () => {
  const { ui, setUI } = useUIStore();
  const photoRef = useRef<HTMLInputElement>(null);

  if (!ui) return null;

  return (
    <Dialog
      open={ui?.memoryDialog?.state}
      onOpenChange={(open) => setUI({ memoryDialog: { state: open } })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Memory</DialogTitle>
          <Formik
            initialValues={createMemorySchema.initialValue}
            validationSchema={createMemorySchema.validationSchema}
            onSubmit={createMemoryAction}
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
              <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="gap-2 flex flex-col">
                  <Label
                    htmlFor="title"
                    className="flex items-center justify-between"
                  >
                    Title
                    <p className="text-xs text-gray-500 text-right">
                      {values.title.length}/50
                    </p>
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Enter your memory title"
                    maxLength={50}
                    onChange={handleChange}
                    defaultValue={values.title}
                  />

                  <p className="text-red-600 text-sm">
                    {errors.title && touched.title && errors.title}
                  </p>
                </div>
                <div className="gap-2 flex flex-col">
                  <Label htmlFor="timestamp">Timestamp</Label>
                  <Input
                    type="datetime-local"
                    id="timestamp"
                    placeholder="Select a timestamp"
                    defaultValue={values.timestamp}
                    onChange={handleChange}
                  />
                  <p className="text-red-600 text-sm">
                    {errors.timestamp && touched.timestamp && errors.timestamp}
                  </p>
                </div>
                <div className="gap-2 flex flex-col">
                  <Label
                    htmlFor="description"
                    className="flex items-center justify-between"
                  >
                    Description
                    <p className="text-xs text-gray-500 text-right">
                      {values.description.length}/500
                    </p>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter your memory description"
                    rows={5}
                    maxLength={500}
                    onChange={handleChange}
                    defaultValue={values.description}
                  />
                  <p className="text-red-600 text-sm">
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </p>
                </div>
                <div className="gap-2 flex flex-col">
                  <Label>Upload Images</Label>
                  <input
                    type="file"
                    id="files"
                    accept="image/*"
                    onChange={(event) => {
                      if (event.target.files) {
                        setFieldValue("files", [
                          ...values.files,
                          event.target.files[0],
                        ]);
                      }
                    }}
                    ref={photoRef}
                    className="hidden"
                  />
                  <Button
                    variant="secondary"
                    className="py-10"
                    type="button"
                    onClick={() => photoRef.current?.click()}
                  >
                    <ImageLucide size={24} />
                    <span>Add Photos</span>
                  </Button>
                  {errors.files && touched.files && (
                    <p className="text-red-600 text-sm">
                      {Array.isArray(errors.files)
                        ? errors.files.join(", ")
                        : errors.files}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {values.files.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={
                          file instanceof File
                            ? URL.createObjectURL(file)
                            : (file as IMemoryMedia).url
                        }
                        alt="Preview"
                        className="w-full h-24 object-cover rounded-lg border"
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={() => {
                          const updatedFiles = values.files.filter(
                            (_, i) => i !== index,
                          );
                          setFieldValue("files", updatedFiles);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <ServerError status={status} />

                <Button
                  className="w-full mt-4"
                  size="lg"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Create Memory
                </Button>
              </Form>
            )}
          </Formik>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
