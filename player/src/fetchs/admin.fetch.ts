const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";


export async function getPlayers() {
  console.log('No Player Fetch, fetching all players');
  const res = await fetch(`${BASE_URL}/player`, {
    method: "GET",
  });

  console.log('Response from getPlayers:', res);

  if (!res.ok) throw new Error(`Failed to fetch players: ${res.status}`);
  return res.json();
}