import { ResetPasswordForm } from "@/components/reset-password-form"
import { useParams } from "react-router-dom"

export default function ResetPassword() {
    const { token } = useParams<{ token: string  }>()
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ResetPasswordForm token={token!} />
      </div>
    </div>
  )
}
