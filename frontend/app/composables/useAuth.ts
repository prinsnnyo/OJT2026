import type { AuthResponse, User } from '~/types'

export function useAuth() {
  const api = useApi()
  const token = useCookie<string | null>('auth_token', { default: () => null })
  const user = useState<User | null>('auth_user', () => null)

  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(email: string, password: string) {
    const response = await api.post<AuthResponse>('/auth/login', { email, password })
    token.value = response.accessToken
    user.value = response.user
    return response
  }

  async function register(name: string, email: string, password: string) {
    const response = await api.post<AuthResponse>('/auth/register', { name, email, password })
    token.value = response.accessToken
    user.value = response.user
    return response
  }

  function logout() {
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }
}
