"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BackButton from "@/components/BackArrow"

export default function TermsOfService() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
                <CardHeader className="flex flex-col gap-2">
                    <div className="flex justify-center my-6 mx-auto">
                        <BackButton />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-center">
                        Terms of Service
                    </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-justify space-y-4">
                    <p>
                        Welcome to our online health consultation app. By using our platform,
                        you agree to the following Terms of Service. Please read these terms
                        carefully before proceeding.
                    </p>

                    <h3 className="text-lg font-semibold">1. Use of Service</h3>
                    <p>
                        Our app provides online consultations with licensed health
                        professionals. This service is intended for informational and
                        educational purposes only and should not replace in-person medical
                        treatment where required.
                    </p>

                    <h3 className="text-lg font-semibold">2. Eligibility</h3>
                    <p>
                        You must be at least 18 years of age to use our platform. If you are
                        under 18, you may only use the service with parental or guardian
                        consent.
                    </p>

                    <h3 className="text-lg font-semibold">3. Privacy & Security</h3>
                    <p>
                        We value your privacy. All personal health information shared during
                        consultations will be handled in compliance with applicable data
                        protection laws and our Privacy Policy.
                    </p>

                    <h3 className="text-lg font-semibold">4. User Responsibilities</h3>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Provide accurate and truthful information during consultations.</li>
                        <li>Use the platform responsibly and respect healthcare providers.</li>
                        <li>Do not misuse the platform for emergencies or unlawful purposes.</li>
                    </ul>

                    <h3 className="text-lg font-semibold">5. Limitation of Liability</h3>
                    <p>
                        Our app and its healthcare providers will not be held responsible for
                        any decisions you make based on the information provided during
                        consultations. For medical emergencies, always call local emergency
                        services immediately.
                    </p>

                    <h3 className="text-lg font-semibold">6. Changes to Terms</h3>
                    <p>
                        We may update these Terms of Service from time to time. Continued use
                        of our app after updates constitutes acceptance of the revised terms.
                    </p>

                    <p>
                        By using our service, you confirm that you have read, understood, and
                        agreed to these Terms of Service.
                    </p>

                    <div className="flex justify-center my-6 mx-auto">
                        <BackButton />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
