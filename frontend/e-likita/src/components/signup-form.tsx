import { cn, toast } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import val from "@/lib/functions"
import { text } from "@/lib/constants"
import { useState, useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { AxiosError } from "axios"
import Req from "./Req"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  // Formik data
  const initialValues = { fullname: "", email: "", password: "", cpassword: "", gender: "Select Gender", dob: new Date() };
  const validationSchema = Yup.object({
    fullname: val("fullname"),
    email: val("email"),
    password: val("password"),
    cpassword: val("password"),
    gender: val("gender"),
    dob: val("dob"),
  });
  const [loading, setLoading] = useState(false)
  const { api } = useContext(AuthContext)!
  const navigate = useNavigate()


  const signup = async (formData: any) => {
    const { email, fullname: fullName, password, gender, dob } = formData
    setLoading(true)
    try {
      const res = await api.post("/api/v1/auth/signup", { email, fullName, password, gender, dob });
      if (res.status === 200) {
        toast.success(res.data.message)
        navigate("/login");
      }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Signup failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false)
    }
  };



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-blue-800">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (data, { resetForm }) =>
              await signup(data)
            }
          >
            <Form>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  {/* Full Name */}
                  <div className="grid gap-3">
                    <Label htmlFor="fullname">Full Name<Req /></Label>
                    <div>
                      <Field
                        name="fullname"
                        id="fullname"
                        type="text"
                        className={text}
                        placeholder="Full Name"
                      />
                      <ErrorMessage name="fullname" component="small" className="text-red-600" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email<Req /></Label>
                    <div>
                      <Field
                        name="email"
                        id="email"
                        type="email"
                        className={text}
                        placeholder="abc@email.com"
                      />
                      <ErrorMessage name="email" component="small" className="text-red-600" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password<Req /></Label>
                    <div>
                      <Field
                        name="password"
                        id="password"
                        type="password"
                        className={text}
                        placeholder="password"
                      />
                      <ErrorMessage name="password" component="small" className="text-red-600" />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-3">
                    <Label htmlFor="cpassword">Confirm Password<Req /></Label>
                    <div>
                      <Field
                        name="cpassword"
                        id="cpassword"
                        type="password"
                        className={text}
                        placeholder="cpassword"
                      />
                      <ErrorMessage name="cpassword" component="small" className="text-red-600" />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="grid gap-3">
                    <Label htmlFor="gender">Gender<Req /></Label>
                    <div>
                      <Field as="select" name="gender" id="gender" className={text}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                      <ErrorMessage name="gender" component="small" className="text-red-600" />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="grid gap-3">
                    <Label htmlFor="dob">Date of Birth<Req /></Label>
                    <div>
                      <Field
                        name="dob"
                        id="dob"
                        type="date"
                        className={text}
                      />
                      <ErrorMessage name="dob" component="small" className="text-red-600" />
                    </div>
                  </div>

                  {/* Submit Button */}

                  {loading ? (
                    <Button type="submit" className="w-full bg-blue-700">
                      <FontAwesomeIcon icon={faSpinner} spin /> Signing in...
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full bg-blue-700">
                      Sign Up
                    </Button>
                  )}
                </div>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to='/login' className="text-blue-600 underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </Form>
          </Formik>

        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing up, you agree to our <Link to='/termsofservice'>Terms of Service</Link>
      </div>
    </div>
  )
}
