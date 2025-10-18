
import { Schema, model } from 'mongoose'
import speakeasy from 'speakeasy'
import { dSan } from './sanitize';

// const SecretSchema = new Schema(
//     {
//         ascii: { type: String, required: true },
//         hex: { type: String, required: true },
//         base32: { type: String, required: true },
//         otpauth_url: { type: String, required: true },
//     }
// );

const AuthenticationsSchema = new Schema(
    {
        type: { type: String, required: true },
        auth: { type: mongoose.Schema.Types.Mixed, required: true }
    }
);

const TwoFactorAuthSchema = new Schema(
    {
        userId: { type: String, required: true },
        authentications: { type: [AuthenticationsSchema], default: [] }
    },
    { timestamps: true }
);

const TwoFactorAuth = model("TwoFactorAuth", TwoFactorAuthSchema);

export const registerUser = async (req, res) => {
    const { userId, auth } = req.body
    const vd = dSan({ userId, auth })
    {
        const { userId, auth } = vd
        const authTypeExist = await TwoFactorAuth.countDocuments({ userId, 'authentications.type': auth.type }) > 0
        if (authTypeExist) {
            return res.status(400).json({ success: true, message: "Authentication method already exist" })
        } else {
            TwoFactorAuth.updateOne({ userId }, { $push: { 'authentications': { auth } } })
            return res.status(200).json({ success: true, message: "Successfully registered authenticator app", data: auth })
        }
    }

}
