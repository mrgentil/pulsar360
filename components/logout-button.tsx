"use client"
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <button
      className={className || 'btn puprple_btn'}
      onClick={() => {
        logout()
        router.push('/login')
      }}
    >
      Logout
    </button>
  )
}

