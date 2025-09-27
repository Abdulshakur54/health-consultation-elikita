"use client"
import BackButton from "@/components/BackArrow"
import Loading from "@/components/Loading"
import { AuthContext } from "@/contexts/AuthContext"
import { formatDate } from "@/lib/utils"
import {
  Printer,
  Clock,
  AlertTriangle,
  CheckCircle,
  HeartPulse,
  ListChecks,
} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

export type Consultation = {
  id: string; // mapped from _id

  userId: {
    id: string; // mapped from _id of User
    fullName: string;
    email: string;
  };

  medicalHistory: string[];
  medication: string;
  symptoms: string[];
  symptomDuration: string;
  painLevel: number;
  additionalDetails: string;

  breathingSudden: "Yes" | "No" | "";
  breathingActivity: "Yes" | "No" | "";

  painLocation: string;
  painDescription: string;

  createdAt: string; // ISO string from API
  updatedAt: string;
};



export default function Consultation() {
  const { api } = useContext(AuthContext)!
  const [loading, setLoading] = useState(true)
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const { id } = useParams()

  useEffect(() => {
    const getConsultation = async () => {
      try {
        const res = await api.get(`/api/v1/consultations/${id}`)
        if (res.status === 200) {
          setConsultation(res.data.data.consultation)
          setLoading(false)
        }
      } catch (err: any) {
        const message = err.response?.data?.message || err.message
        toast.error(message)
      }
    }
    getConsultation()
  }, [])

  const report = {
    riskAssessment: (consultation!?.painLevel > 6) ? "High Risk" : "Moderate Risk",
    recommendations: [
      "Do not delay - call emergency services if symptoms worsen",
      "Keep this consultation summary for your medical records",
      "Bring this summary to your healthcare provider",
    ]
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    loading ? <Loading /> :
      <div className="min-h-screen bg-gray-50 text-gray-800 print:bg-white">
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          {/* Header */}
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-600/10 text-blue-600 p-3 shadow-sm">
                <HeartPulse className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold">Symptoms Report</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Consultation summary • Generated:{" "}
                  <span className="font-medium text-gray-700">{formatDate(consultation!.createdAt)}</span>
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">{consultation?.userId.fullName}</span>{" "}
                  <span className="text-muted-foreground">• {consultation?.userId.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm text-gray-500">Risk Assessment</span>
                <span
                  className={`mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold
      ${report.riskAssessment === "High Risk" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
                >
                  <AlertTriangle className="h-4 w-4" /> {report.riskAssessment}
                </span>
              </div>

              <div className="flex flex-row justify-between items-center w-full">
                <BackButton />
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-blue-700 transition print:hidden"
                  aria-label="Print report"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </button>
              </div>
            </div>

          </header>

          {/* Main Grid */}
          <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left / Primary Details */}
            <section className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm print:shadow-none print:rounded-none print:p-0">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-blue-600" />
                Report Details
              </h2>

              {/* Symptoms */}
              <div className="mb-5">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Primary Symptoms</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {consultation!.symptoms.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 bg-gray-50 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="truncate">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration & Pain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Symptom Duration</h4>
                  <p className="mt-1 text-gray-800 font-medium">{consultation!.symptomDuration}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Pain Location</h4>
                  <p className="mt-1 text-gray-800 font-medium">{consultation!.painLocation}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-600">Pain Level</h4>

                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                        style={{ width: `${(consultation!.painLevel / 10) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>0</span>
                      <span>{consultation!.painLevel}/10</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-600">Additional Details</h4>
                <p className="mt-2 text-gray-800">{consultation!.additionalDetails}</p>
              </div>

              {/* Recommendations */}
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Recommendations</h3>
                <ul className="list-inside list-decimal space-y-2 text-gray-800">
                  {report.recommendations.map((r, idx) => (
                    <li key={idx} className="pl-1">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Right / Risk Summary */}
            <aside className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 print:shadow-none print:rounded-none print:p-0">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Risk Summary</h3>
                <div
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-sm
                ${report.riskAssessment === "High Risk" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}
                >
                  <AlertTriangle className="h-5 w-5" />
                  {report.riskAssessment}
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-dashed border-gray-100">
                <div className="text-sm text-gray-500">
                  <Clock className="inline-block mr-2 h-4 w-4" />
                  Generated: <span className="font-medium text-gray-700">{formatDate(consultation!.createdAt)}</span>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
  )
}
