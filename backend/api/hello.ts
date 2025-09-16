export default function handler(req: any, res: any) {
  res.status(200).json({ 
    message: 'Authentication System API - Backend is running!', 
    status: 'success',
    method: req.method,
    url: req.url 
  });
}