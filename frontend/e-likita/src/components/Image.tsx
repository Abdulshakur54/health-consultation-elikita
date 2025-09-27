import { AdvancedImage } from "@cloudinary/react"
import { Cloudinary } from "@cloudinary/url-gen"
import { quality } from "@cloudinary/url-gen/actions/delivery"
import { scale } from "@cloudinary/url-gen/actions/resize"
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage"

const myCld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string,
  },
})

interface ImageProps {
  src: string
  className?: string
}

const Image: React.FC<ImageProps> = ({ src, className }) => {
  const cldImg: CloudinaryImage = myCld
    .image(src)
    .resize(scale().width("auto"))
    .delivery(quality("auto"))
    .format("auto") // ✅ use string instead of auto()

  return <AdvancedImage cldImg={cldImg} className={className} />
}

export default Image
