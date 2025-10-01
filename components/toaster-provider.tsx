"use client"
import { Toaster } from 'sonner'

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        style: { fontSize: 14 },
      }}
    />
  )
}

