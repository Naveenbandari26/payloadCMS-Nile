/**
 * Authentication utility functions for interacting with PayloadCMS auth endpoints
 */

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
}

export interface AuthResponse {
  user?: {
    id: string
    email: string
  }
  token?: string
  message?: string
  errors?: Array<{
    message: string
    field?: string
  }>
}

/**
 * Login user with email and password
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        errors: data.errors || [{ message: data.message || data.error || 'Login failed' }],
      }
    }

    // PayloadCMS returns user in data.user or data.doc
    return {
      user: data.user || data.doc,
      token: data.token,
    }
  } catch (error) {
    return {
      errors: [{ message: error instanceof Error ? error.message : 'Network error occurred' }],
    }
  }
}

/**
 * Signup (register) a new user
 */
export async function signup(userData: SignupData): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    })

    const data = await response.json()
    console.log(data)
    if (!response.ok) {
      return {
        errors: data.errors || [{ message: data.message || data.error || 'Signup failed' }],
      }
    }

    // PayloadCMS returns the created document in data.doc
    return {
      user: data.doc || data.user,
      token: data.token,
    }
  } catch (error) {
    return {
      errors: [{ message: error instanceof Error ? error.message : 'Network error occurred' }],
    }
  }
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
  try {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Logout error:', error)
  }
}

