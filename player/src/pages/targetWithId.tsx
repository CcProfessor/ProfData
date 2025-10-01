import React from "react"
import { useParams } from "react-router-dom"
import { TargetProvider } from "../contexts/target.context"
import { TargetWrapper } from "../components/target.components"

export default function TargetWithIdPage() {
  const { playerId } = useParams<{ playerId: string }>()
  const { targetId } = useParams<{ targetId: string }>()

  if (!playerId || !targetId) {
    return <p style={{ color: "red" }}>PlayerId e TargetId não encontrado na URL</p>
  }

  return (
    <TargetProvider>
      <main style={{ padding: "2rem" }}>
        <h1>Gerenciamento de Target</h1>
        <TargetWrapper /> {/* 👉 passa o id para o wrapper */}
      </main>
    </TargetProvider>
  )
}
