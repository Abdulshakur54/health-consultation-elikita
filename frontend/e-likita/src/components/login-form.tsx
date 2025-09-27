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

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    // Formik data
    const initialValues = { email: "", password: "" };
    const validationSchema = Yup.object({
        email: val("email"),
        password: val("password"),
    });

    const [loading, setLoading] = useState(false)
    const { api, setToken } = useContext(AuthContext)!
    const navigate = useNavigate()

    const login = async ({ email, password }: any) => {
        setLoading(true)
        try {
            const res = await api.post("/api/v1/auth/login", { email, password });
            if (res.status === 200) {
                const {
                    data: { token },
                } = res;
                localStorage.setItem("token", token);
                toast.success(res.data.message)
                setToken(token);
                navigate('/portal')
            }
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Login failed");
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
                    <CardTitle className="text-xl text-blue-800">Login to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (data) =>
                            await login(data)
                        }
                    >
                        <Form>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
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
                                    {/* Submit Button */}

                                    {loading ? (
                                        <Button type="submit" className="w-full bg-blue-700">
                                            <FontAwesomeIcon icon={faSpinner} spin /> Logging in...
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="w-full bg-blue-700">
                                            Login
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
