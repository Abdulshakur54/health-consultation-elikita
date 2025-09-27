import { AuthContext } from "@/contexts/AuthContext"
import { allowedExtensions, maxUploadFileSize } from "@/lib/constants"
import { capitalizeFirstLetter, formatDate, toast } from "@/lib/utils"
import { useContext, useState } from "react"
import avatarIcon from '@/assets/avatarIcon.png'
import Loading from "@/components/Loading"

export default function Profile() {
  const { api, authUser, setAuthUser } = useContext(AuthContext)!
  const [selectedImg, setSelectedImg] = useState<File | null>()
  const [loading, setLoading] = useState(false)

  const updateProfile = async (data: FormData, id: String) => {
    try {
      setLoading(true)
      const res = await api.put(`/api/v1/users/${id}`, data)
      setAuthUser(res.data.data.user)
      toast.success('Profile image updated')
    } catch (err: any) {
      setLoading(false)
      toast.error(err.response?.data?.message || err.message);
    }

  }



  const validateImage = async (e: any) => {
    const file = e.target.files[0]
    if (file && file.size > maxUploadFileSize) {
      e.target.value = ""
      toast.error(`Image should not be greater than ${(maxUploadFileSize / 1024 / 1024).toFixed(1)}MB`)
      return
    }
    setSelectedImg(file)
    const formData = new FormData()
    formData.append('profilePic', file)
    setLoading(true)
    await updateProfile(formData, authUser!._id)
    setLoading(false)
  }
  const imageUrl = () => {
    if (authUser?.profilePic) {
      return authUser.profilePic
    } else {
      if (selectedImg) {
        return URL.createObjectURL(selectedImg)
      }
      return avatarIcon
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="w-full max-w-5xl mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Patient <span className="text-blue-600">Profile</span>
        </h1>
        <p className="text-gray-500 mt-2">Your personal and medical information at a glance</p>
      </header>

      {/* Profile Card */}
      <main className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar + Upload */}
          <div className="flex flex-col items-center">
            {loading ? <Loading /> :
              <label htmlFor="profileImage" className="cursor-pointer group">
                <input
                  onChange={validateImage}
                  type="file"
                  id="profileImage"
                  accept={allowedExtensions.join(", ")}
                  hidden
                  name="profileimage"
                />
                <div className="relative">
                  <img
                    src={imageUrl()}
                    alt="Profile"
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <span className="text-white text-sm font-medium">Change</span>
                  </div>
                </div>
                <p className="text-xs text-center mt-2 underline text-blue-600">Click to upload new photo</p>
              </label>
            }

          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{authUser?.fullName}</h2>
              <p className="text-gray-500">Patient Information</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <span className="block text-sm text-gray-500">Date of Birth</span>
                <span className="block text-lg font-medium text-gray-900">{formatDate(authUser!.dob)}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <span className="block text-sm text-gray-500">Gender</span>
                <span className="block text-lg font-medium text-gray-900">{capitalizeFirstLetter(authUser!.gender)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Medical History
          </h3>

          {authUser!.medicalHistory?.length > 0 ? (
            <ul className="space-y-2">
              {authUser!.medicalHistory.map((mh) => (
                <li
                  key={mh}
                  className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg shadow-sm text-sm font-medium"
                >
                  {mh}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No medical history available</p>
          )}
        </div>
      </main>
    </div>
  )
}
