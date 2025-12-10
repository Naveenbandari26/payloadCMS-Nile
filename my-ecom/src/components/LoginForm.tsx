'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { login, type LoginCredentials } from '@/lib/auth'
import './AuthForm.css'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const credentials: LoginCredentials = {
      email,
      password,
    }

    const result = await login(credentials)

    if (result.errors) {
      setError(result.errors[0]?.message || 'Login failed')
      setLoading(false)
      return
    }

    // Redirect to home page on success
    router.push('/')
    router.refresh()
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
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
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="auth-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  )
}

