import React from "react"
import { useParams } from "react-router-dom"
import { TargetProvider } from "../contexts/target.context"
import { TargetWrapper } from "../components/target.components"

export default function TargetPage() {
  const { id } = useParams<{ id: string }>() // 👈 pega o id da rota

  if (!id) {
    return <p style={{ color: "red" }}>ID do target não encontrado na URL</p>
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
