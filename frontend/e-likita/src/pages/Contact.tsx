import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import val from "@/lib/functions"
import { useContext, useState } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { AxiosError } from "axios"
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
const recapthaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string


export default function Contact() {
  const [loading, setLoading] = useState(false)
  const { api } = useContext(AuthContext)!
  const navigate = useNavigate()
  const [recaptchaVerified, setRecaptchaVerified] = useState(false)
  const [recaptchaRsp, setRecaptchaRsp] = useState(null)

  // Formik data
  const initialValues = { fullName: "", email: "", message: "" };
  const validationSchema = Yup.object({
    fullName: val('fullname'),
    email: val("email"),
    message: val("text"),
  });


  const contactUs = async ({ fullName, email, message }: any) => {
    if (recaptchaVerified) {
      setLoading(true)
      try {
        const res = await api.post("/api/v1/public/contactus", { fullName, email, message, captchaData: recaptchaRsp });
        if (res.status === 200) {
          toast.success(res.data.message)
          toast.success('Do check your spam folder for our automated response if not seen in your Inbox', {duration: 10000})
          navigate('/')
        }
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "Message not sent");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
      finally {
        setLoading(false)
        setRecaptchaVerified(false)
      }
    } else {
      toast.error("Kindly confirm you aren't a robot");
    }
  };
  const verified = (value: any) => {
    setRecaptchaVerified(true)
    setRecaptchaRsp(value)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Contact Us</h2>
      <p className="text-center text-gray-600 mb-6">We’d love to hear from you. Fill out the form below:</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data) =>
          await contactUs(data)
        }>
        <Form className="space-y-4">
          <div>
            <Field type="text" placeholder="Full Name" name="fullName" id="fullName" className="w-full p-3 border rounded-xl" />
            <ErrorMessage name="fullName" component="small" className="text-red-600" />
          </div>
          <div>
            <Field type="email" placeholder="Email" className="w-full p-3 border rounded-xl" name="email" id="email" />
          </div>
          <div>
            <Field as="textarea" placeholder="Message" rows={4} className="w-full p-3 border rounded-xl" name="message" id="message" />
          </div>
          <ReCAPTCHA
            sitekey={recapthaSiteKey}
            onChange={verified}
          />
          {loading ? (
            <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl cursor-pointer cursor-not-allowed" disabled>
              <FontAwesomeIcon icon={faSpinner} spin /> Sending Message...
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl cursor-pointer">Send Message</Button>
          )}

        </Form>
      </Formik>

    </div>
  );
}