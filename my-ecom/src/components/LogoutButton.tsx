'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
    router.refresh()
  }

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  )
}

