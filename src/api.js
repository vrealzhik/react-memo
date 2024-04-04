const leaderHost = "https://wedev-api.sky.pro/api/leaderboard";

export async function getLeaders() {
  const response = await fetch(leaderHost, {
    method: "GET",
  });
  if (!response.status === 200) {
    throw new Error("Ошибка");
  }
  return await response.json();
}

export async function postLeader(name, time) {
  const response = await fetch(leaderHost, {
    method: "POST",
    headers: {
      name: name,
      time: time,
    },
  });
  if (!response.status === 200) {
    throw new Error("Ошибка");
  }
  return await response.json();
}
