export default async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Send a POST request to Strapi's user registration endpoint
    const response = await fetch(`127.0.0.1:1337/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'User registered successfully' });
    } else {
      res.status(data.statusCode).json({ error: data.message[0].messages[0].message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};