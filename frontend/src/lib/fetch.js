const API_BASE_URL = "http://localhost:3001";

export const fetcher = async (url) => {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};
