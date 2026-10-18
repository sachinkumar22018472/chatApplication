import dp from "../assets/dp.webp"
import { serverUrl } from "../main"

export const getProfileImage = (img) => {
  if (!img) return dp
  if (typeof img === "string" && (img.startsWith("http://localhost:") || img.startsWith("http://localhost"))) {
    return img.replace(/^http:\/\/localhost(:\d+)?/, serverUrl)
  }
  return img
}

export const getMessageImage = (img) => {
  if (!img) return null
  if (typeof img === "string" && (img.startsWith("http://localhost:") || img.startsWith("http://localhost"))) {
    return img.replace(/^http:\/\/localhost(:\d+)?/, serverUrl)
  }
  return img
}

export const handleImageError = (e) => {
  e.currentTarget.onerror = null
  e.currentTarget.src = dp
}
