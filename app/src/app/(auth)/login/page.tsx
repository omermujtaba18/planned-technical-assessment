"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import { loginSchema } from "@/forms/schemas/auth";
import { loginAction } from "@/forms/actions/auth";
import { ArrowRight } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { ServerError } from "@/components/shared/server-error";

export default function Login() {
  return (
    <section id="login" className="mt-32">
      <AuthCard
        title="Welcome back"
        subTitle="Login to continue your journey"
        altText="Don't have an account?"
        altLinkText="Sign up"
        altLinkHref="/signup"
      >
        <Formik
          initialValues={loginSchema.initialValue}
          validationSchema={loginSchema.validationSchema}
          onSubmit={loginAction}
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
                Log In
                <ArrowRight />
              </Button>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </section>
  );
}
