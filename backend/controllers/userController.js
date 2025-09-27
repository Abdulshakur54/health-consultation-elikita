import y from 'yup'
import { ValidationError } from 'yup'
import User from '../models/User.js'
import { sphone, sfullName, sobjectId } from '../lib/validator.js'
import { cloudinary } from '../lib/cloudinary.js'
import { uploadFile } from '../lib/helper.js'





export const updateUser = async (req, res) => {
    console.log(req.file)
    try {
        const userId = req.params.id
        const oldProfilePicId = await User.findById(userId).select('profilePicId')
        const { secure_url, public_id } = await uploadFile(req.file)
        const user = await User.findByIdAndUpdate(userId, {$set: {profilePic: secure_url, profilePicId: public_id}}, { new: true })
        //delete old profile pic from cloudinary
        await cloudinary.uploader.destroy(oldProfilePicId)
        res.status(200).json({ success: true, message: "Profile successfully updated", data: { user } })
    } catch (e) {
        console.log(e)
        if (e instanceof ValidationError) {
            res.status(400).json({ success: false, message: e.errors })
        } else {
            res.status(500).json({ success: false, message: e.message })
        }
    }

}

export const getUser = (req, res) => {
    res.status(200).json({ success: true, data: { user: req.user } })
}