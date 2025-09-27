import ConsultationForm from '../models/Consultation.js'

export const createConsultation = async (req, res) => {
    const userId = req.user._id
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
    }
        = req.body
    try {
        const consultation = await ConsultationForm.create({
            userId,
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
        })
        res.status(200).json({
            success: true, message: "Consultation was submitted successfully",
            data: consultation
        })
    } catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

export const getConsultations = async (req, res) => {
    try {
        const userId = req.user._id
        const consultations = await ConsultationForm.find({ userId }).select('_id medication symptomDuration painLevel')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true, message: "",
            data: { consultations }
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: e.message })
    }
}

export const getConsultation = async (req, res) => {
    try {
        const consultationId = req.params.id;

        const consultation = await ConsultationForm.findById(consultationId)
            .populate("userId", "fullName email"); // join only these fields

        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "Consultation not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "",
            data: { consultation },
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};
