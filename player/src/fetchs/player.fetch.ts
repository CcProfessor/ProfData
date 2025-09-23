const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export async function playerLogin(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}

export async function getPlayer(id: string) {
  const res = await fetch(`${BASE_URL}/api/player/${id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error(`Failed to fetch player ${id}: ${res.status}`);
  return res.json();
}

export async function updatePlayer(id: string, data: Partial<{ username: string; password: string; access: number }>) {
  const res = await fetch(`${BASE_URL}/api/player/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Failed to update player ${id}: ${res.status}`);
  return res.json();
}

export async function fetchProtected(url: string) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}