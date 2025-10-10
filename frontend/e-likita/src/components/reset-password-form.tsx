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
import Req from "./Req"
import { useContext, useState } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { AxiosError } from "axios"
type ResetPasswordFormProps = React.ComponentProps<"div"> & {
    token: string;
};

export function ResetPasswordForm({
    className,
    ...props
}: ResetPasswordFormProps) {

    // Formik data
    const initialValues = { password: "", cpassword: "" };
    const validationSchema = Yup.object({
        password: val("password"),
        cpassword: val("cpassword"),
    });

    const { token } = props
    const [loading, setLoading] = useState(false)
    const { api } = useContext(AuthContext)!
    const navigate = useNavigate()

    const resetPassword = async ({ password, cpassword }: any) => {
        setLoading(true)
        try {
            const res = await api.post("/api/v1/password-recovery/reset-password", { password, cpassword, token });
            if (res.status === 200 && res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Password reset failed");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl text-blue-800">Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (data) =>
                            await resetPassword(data)
                        }
                    >
                        <Form>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    {/* Email */}
                                    <div className="grid gap-3">
                                        <Label htmlFor="password">Password<Req /></Label>
                                        <div>
                                            <Field
                                                name="password"
                                                id="password"
                                                type="password"
                                                className={text}
                                            />
                                            <ErrorMessage name="password" component="small" className="text-red-600" />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="grid gap-3">
                                        <div className="flex justify-between">
                                            <span><Label htmlFor="cpassword">Confirm Password<Req /></Label></span><span onClick={()=>navigate('/password-request')} className="text-sm hover:underline cursor-pointer text-blue-600 underline-offset-4">Resend reset link</span>
                                        </div>
                                        <div>
                                            <Field
                                                name="cpassword"
                                                id="cpassword"
                                                type="password"
                                                className={text}
                                            />
                                            <ErrorMessage name="cpassword" component="small" className="text-red-600" />
                                        </div>
                                    </div>
                                    {/* Submit Button */}

                                    {loading ? (
                                        <Button type="submit" className="w-full bg-blue-700 cursor-not-allowed" disabled>
                                            <FontAwesomeIcon icon={faSpinner} spin /> Resetting Password ...
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="w-full bg-blue-700 cursor-pointer">
                                            Reset Password
                                        </Button>
                                    )}
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link to='/signup' className="text-blue-600 underline-offset-4">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}
