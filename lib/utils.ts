import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getChannelColor(channel: string) {
  const colors = {
    instagram: "bg-instagram",
    facebook: "bg-facebook", 
    whatsapp: "bg-whatsapp",
    email: "bg-email",
    default: "bg-gray-500"
  }
  return colors[channel as keyof typeof colors] || colors.default
}

export function getStatusColor(status: string) {
  const colors = {
    draft: "bg-gray-500",
    review: "bg-warning",
    scheduled: "bg-pulsar-500",
    published: "bg-success",
    default: "bg-gray-500"
  }
  return colors[status as keyof typeof colors] || colors.default
}
