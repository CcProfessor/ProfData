import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPlayer } from "../fetchs/player.fetch"
import { newTarget } from "../fetchs/target.fetch" // 👈 importa o fetch
import { CreateTargetDto } from "../rules/interfaces/target.interfaces"

function Data() {
  const navigate = useNavigate()
  const [player, setPlayer] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlayer() {
      const token = localStorage.getItem("token")
      const storedPlayer = localStorage.getItem("player")

      if (!token || !storedPlayer) {
        navigate("/login")
        return
      }

      try {
        const parsedPlayer = JSON.parse(storedPlayer)
        const playerData = await getPlayer(parsedPlayer.id)
        setPlayer(playerData)
      } catch (err: any) {
        setError(err.message || "Erro ao carregar jogador")
      } finally {
        setLoading(false)
      }
    }

    fetchPlayer()
  }, [navigate])

  async function handleCreateTarget() {
    try {
      const token = localStorage.getItem("token") || ""
      const dto: CreateTargetDto = { playerId: player.id }

      const target = await newTarget(dto, token)

      // redireciona para a página do target
      navigate(`/target/${target.id}`)
    } catch (err: any) {
      setError(err.message || "Erro ao criar target")
    }
  }

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

      <button onClick={handleCreateTarget}>Criar novo Esquema</button>
    </div>
  )
}

export default Data
