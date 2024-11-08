export async function fetchChannels(userId: string) {
  const response = await fetch(`/api/channels/${userId}`);
  const result = await response.json();
  return result;
}
