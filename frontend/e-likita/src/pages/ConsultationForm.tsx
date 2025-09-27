"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { cn, toast } from "@/lib/utils"
import { AuthContext } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const steps = ["Patient Information", "Symptom Assessment", "Follow-up Questions"]

type PatientFormData = {
  userId: string,
  medicalHistory: string[]
  medication: string
  symptoms: string[]
  symptomDuration: string
  painLevel: number
  additionalDetails: string
  breathingSudden: "Yes" | "No" | ""
  breathingActivity: "Yes" | "No" | ""
  painLocation: string
  painDescription: string
}

export default function ConsultationForm() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { api } = useContext(AuthContext)!
  const [formData, setFormData] = useState<PatientFormData>({
    userId: "",
    medicalHistory: [],
    medication: "",
    symptoms: [],
    symptomDuration: "",
    painLevel: 0,
    additionalDetails: "",
    breathingSudden: "",
    breathingActivity: "",
    painLocation: "",
    painDescription: "",
  })

  const handleChange = (
    field: keyof PatientFormData,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const submitConsultaion = async (formData: any) => {
    const {
      medicalHistory,
      medication,
      symptoms,
      symptomDuration,
      painLevel,
      additionalDetails,
      breathingSudden,
      breathingActivity,
      painLocation,
      painDescription
    } = formData
    try {
      setLoading(true)
      const res = await api.post("/api/v1/consultations", {
        medicalHistory,
        medication,
        symptoms,
        symptomDuration,
        painLevel,
        additionalDetails,
        breathingSudden,
        breathingActivity,
        painLocation,
        painDescription
      });
      if (res.status === 200) {
        toast.success(res.data.message)
        navigate("/portal");
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

  const toggleCheckbox = (field: keyof PatientFormData, value: string) => {
    setFormData((prev) => {
      const current = prev[field] as string[]
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const submitForm = async () => {
    await submitConsultaion(formData)
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={cn(
                "flex items-center justify-center rounded-full w-10 h-10 mx-auto text-white",
                i <= step ? "bg-blue-600" : "bg-gray-300"
              )}
            >
              {i + 1}
            </div>
            <p className="text-center mt-2 text-sm">{s}</p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 0 && (
        <div className="space-y-4">
          <fieldset className="space-y-2">
            <legend className="font-medium">Medical History</legend>
            {["Diabetes", "High Blood Pressure", "Heart Disease", "Asthma", "Known Allergies"].map((m) => (
              <label key={m} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.medicalHistory.includes(m)}
                  onChange={() => toggleCheckbox("medicalHistory", m)}
                />
                <span>{m}</span>
              </label>
            ))}
          </fieldset>
          
          <Textarea
            id="currentMedication"
            placeholder="Description of your current medication"
            value={formData.medication}
            onChange={(e) => handleChange("medication", e.target.value)}
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <fieldset className="space-y-2">
            <legend className="font-medium">Primary Symptoms</legend>
            {[
              "Fever/High Temperature",
              "Chest Pain",
              "Difficulty Breathing",
              "Severe Headache",
              "Abdominal Pain",
              "Nausea/Vomiting",
              "Diarrhea",
              "Cough",
              "Sore Throat",
              "Fatigue/Weakness",
              "Dizziness",
              "Skin Rash",
              "Joint Pain",
              "Back Pain",
              "Urinary Problems",
            ].map((symptom) => (
              <label key={symptom} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.symptoms.includes(symptom)}
                  onChange={() => toggleCheckbox("symptoms", symptom)}
                />
                <span>{symptom}</span>
              </label>
            ))}
          </fieldset>

          <select
            className="border rounded p-2 w-full"
            value={formData.symptomDuration}
            onChange={(e) => handleChange("symptomDuration", e.target.value)}
          >
            <option value="">How long?</option>
            <option value="Less than 24hrs">Less than 24hrs</option>
            <option value="1-3 days">1-3 days</option>
            <option value="4-7 days">4-7 days</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="Above 2 weeks">Above 2 weeks</option>
          </select>

          <div>
            <label className="block mb-2 font-medium">Pain Level</label>
            <Slider
              value={[formData.painLevel]}
              min={0}
              max={10}
              step={1}
              onValueChange={(v) => handleChange("painLevel", v[0])}
              className={cn(
                formData.painLevel < 4
                  ? "text-green-600"
                  : formData.painLevel < 7
                    ? "text-yellow-500"
                    : "text-red-600"
              )}
            />
            <p className="mt-2 text-sm">Level: {formData.painLevel}</p>
          </div>

          <Textarea
            placeholder="Additional Details"
            value={formData.additionalDetails}
            onChange={(e) => handleChange("additionalDetails", e.target.value)}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="font-medium">Questions about Difficulty Breathing</p>
          <select
            className="border rounded p-2 w-full"
            value={formData.breathingSudden}
            onChange={(e) => handleChange("breathingSudden", e.target.value)}
          >
            <option value="">Did it start suddenly?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            className="border rounded p-2 w-full"
            value={formData.breathingActivity}
            onChange={(e) => handleChange("breathingActivity", e.target.value)}
          >
            <option value="">Worsens with activity?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <p className="font-medium">Questions about Abdominal Pain</p>
          <select
            className="border rounded p-2 w-full"
            value={formData.painLocation}
            onChange={(e) => handleChange("painLocation", e.target.value)}
          >
            <option value="">Where is the pain?</option>
            <option value="Upper right">Upper right</option>
            <option value="Upper left">Upper left</option>
            <option value="Lower right">Lower right</option>
            <option value="Lower left">Lower left</option>
            <option value="Center">Center</option>
          </select>

          <select
            className="border rounded p-2 w-full"
            value={formData.painDescription}
            onChange={(e) => handleChange("painDescription", e.target.value)}
          >
            <option value="">How would you describe it?</option>
            <option value="Cramping">Cramping</option>
            <option value="Sharp">Sharp</option>
            <option value="Dull">Dull</option>
            <option value="Burning">Burning</option>
          </select>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          disabled={step === 0}
          onClick={prevStep}
          className="cursor-pointer bg-blue-700"
        >
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={nextStep} className="cursor-pointer bg-blue-700">Next</Button>
        ) : loading ? (
          <Button type="submit" className="cursor-pointer bg-blue-700">
            <FontAwesomeIcon icon={faSpinner} spin /> Submitting ...
          </Button>
        ) : (
          <Button type="submit" className="cursor-pointer bg-blue-700" onClick={submitForm}>
            Submit!
          </Button>
        )}
      </div>

      {/* Step navigation (jump to step) */}
      <div className="flex justify-center mt-6 space-x-2">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={cn(
              "w-3 h-3 rounded-full",
              i === step ? "bg-blue-600" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  )
}
