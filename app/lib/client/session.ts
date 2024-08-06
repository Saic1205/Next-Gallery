export async function fetchSession() {
  const response = await fetch("/api/session");
  if (response.ok) {
    const data = await response.json();
    console.log("Session found", data);
    return data;
  } else {
    console.log("Session not found");
    return null;
  }
}