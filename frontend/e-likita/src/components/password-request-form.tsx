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

export function PasswordRequestForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    // Formik data
    const initialValues = { email: ""};
    const validationSchema = Yup.object({
        email: val("email"),
    });

    const [loading, setLoading] = useState(false)
    const { api } = useContext(AuthContext)!
    const navigate = useNavigate()

    const handleSubmit = async ({ email }: any) => {
        setLoading(true)
        try {
            const res = await api.post("/api/v1/password-recovery/request-reset", { email });
            if (res.status === 200 && res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Password Reset request failed");
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
                    <CardTitle className="text-xl text-blue-800">Recover your password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (data) =>
                            await handleSubmit(data)
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

                                    {/* Submit Button */}

                                    {loading ? (
                                        <Button type="submit" className="w-full bg-blue-700 cursor-not-allowed" disabled>
                                            <FontAwesomeIcon icon={faSpinner} spin /> Emailing Reset Link...
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="w-full bg-blue-700 cursor-pointer">
                                            Email me a reset link
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Form>
                    </Formik>

                </CardContent>
            </Card>
        </div>
    )
}
