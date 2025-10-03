import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playerLogin } from '../fetchs/player.fetch'

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError(null) // limpa erro anterior
    setLoading(true)

    try {
      // ⚡ playerLogin já retorna o JSON { access_token, player }
      const data = await playerLogin(username, password)

      if (data?.access_token) {
        localStorage.setItem("token", data.access_token)
        localStorage.setItem("player", JSON.stringify(data.player))
        localStorage.setItem("playerId", data.player.id);

        // redireciona já com o ID do player
        navigate(`/user/${data.player.id}`)
      } else {
        setError('Credenciais inválidas')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao tentar logar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          className="loginInput"
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          className="passInput"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleLogin}
        disabled={!username || !password || loading}
      >
        {loading ? 'Entrando...' : 'Confirmar'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}
    </div>
  )
}

export default Login
