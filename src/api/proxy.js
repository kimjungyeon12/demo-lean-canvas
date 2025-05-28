// api/proxy.js
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // URL 파라미터 처리
  const { path = [], ...query } = req.query;
  const pathString = Array.isArray(path) ? path.join('/') : '';

  const targetUrl = `https://json-server-vercel-ebon-two.vercel.app/${pathString}`;
  const queryString = new URLSearchParams(query).toString();
  const fullUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

  try {
    const response = await fetch(fullUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' && req.method !== 'DELETE' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'API 요청 실패' });
  }
}
