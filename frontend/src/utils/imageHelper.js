import dp from "../assets/dp.webp"
import { serverUrl } from "../main"

export const getProfileImage = (img) => {
  if (!img) return dp
  if (typeof img === "string" && (img.startsWith("http://localhost:8000") || img.startsWith("http://localhost:5000"))) {
    return img.replace(/^http:\/\/localhost:\d+/, serverUrl)
  }
  return img
}

export const handleImageError = (e) => {
  e.currentTarget.onerror = null
  e.currentTarget.src = dp
}
