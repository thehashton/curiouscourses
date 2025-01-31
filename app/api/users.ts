export default async (req: any, res: any) => {
  if (req.method === "GET") {
    const { token } = req.headers;

    // Send a GET request to Strapi's user endpoint with the JWT token
    const response = await fetch("http://localhost:1337/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(data.statusCode).json({ error: "Failed to fetch user data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
