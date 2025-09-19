import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPlayer } from "../fetchs/player.fetch"

// função auxiliar para decodificar o payload do JWT
function decodeJwt<T = any>(token: string): T | null {
  try {
    const base64Payload = token.split(".")[1]
    const payload = atob(base64Payload)
    return JSON.parse(payload)
  } catch {
    return null
  }
}

function Data() {
  const navigate = useNavigate()
  const [player, setPlayer] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlayer() {
      const token = localStorage.getItem("access_token")

      if (!token) {
        navigate("/login")
        return
      }

      const payload = decodeJwt<{ sub: string }>(token)

      if (!payload?.sub) {
        localStorage.removeItem("access_token")
        navigate("/login")
        return
      }

      try {
        const playerData = await getPlayer(payload.sub, token)
        setPlayer(playerData)
      } catch (err: any) {
        setError(err.message || "Erro ao carregar jogador")
      } finally {
        setLoading(false)
      }
    }

    fetchPlayer()
  }, [navigate])

  if (loading) return <p>Carregando...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Área do Usuário</h1>
      {player && (
        <>
          <p><b>ID:</b> {player.id}</p>
          <p><b>Usuário:</b> {player.username}</p>
          <p><b>Criado em:</b> {new Date(player.created_at).toLocaleString()}</p>
        </>
      )}

      <button>Criar novo Esquema</button>
    </div>
  )
}

export default Data
