import {Schema, model} from 'mongoose'

const ConsultationFormSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    medicalHistory: { type: [String], default: [] },
    medication: { type: String, default: "" },
    symptoms: { type: [String], default: [] },
    symptomDuration: { type: String, default: "" },
    painLevel: { type: Number, min: 0, max: 10, required: true },
    additionalDetails: { type: String, default: "" },

    breathingSudden: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },
    breathingActivity: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },

    painLocation: { type: String, default: "" },
    painDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

const ConsultationForm = model("ConsultationForm", ConsultationFormSchema);

export default ConsultationForm;
