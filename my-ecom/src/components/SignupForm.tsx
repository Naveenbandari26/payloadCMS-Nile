'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signup, type SignupData } from '@/lib/auth'
import './AuthForm.css'

export default function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setLoading(true)

    const userData: SignupData = {
      email,
      password,
    }

    const result = await signup(userData)

    if (result.errors) {
      setError('Signup failed')
      setLoading(false)
      return
    }

    // Redirect to home page on success
    router.push('/')
    router.refresh()
  }

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder="Enter your password (min. 8 characters)"
            minLength={8}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder="Confirm your password"
            minLength={8}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <div className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  )
}

