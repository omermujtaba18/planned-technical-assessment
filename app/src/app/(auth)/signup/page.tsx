"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import { signupSchema } from "@/forms/schemas/auth";
import { signupAction } from "@/forms/actions/auth";
import { ArrowRight } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { ServerError } from "@/components/shared/server-error";

export default function Signup() {
  return (
    <section id="signup" className="mt-32">
      <AuthCard
        title="Hi there!"
        subTitle="Create your account to start your journey"
        altText="Already have an account?"
        altLinkText="Login"
        altLinkHref="/login"
      >
        <Formik
          initialValues={signupSchema.initialValue}
          validationSchema={signupSchema.validationSchema}
          onSubmit={signupAction}
        >
          {({
            errors,
            status,
            touched,
            handleSubmit,
            handleChange,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <div className="gap-2 flex flex-col">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    type="text"
                    id="fullName"
                    placeholder="John Doe"
                    onChange={handleChange}
                  />
                  <p className="text-red-600 text-sm">
                    {errors.fullName && touched.fullName && errors.fullName}
                  </p>
                </div>
                <div className="gap-2 flex flex-col">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="john@doe.com"
                    onChange={handleChange}
                  />
                  <p className="text-red-600 text-sm">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <div className="gap-2 flex flex-col">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder=""
                    onChange={handleChange}
                  />
                  <p className="text-red-600 text-sm">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <ServerError status={status} />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                Create Account
                <ArrowRight />
              </Button>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </section>
  );
}
