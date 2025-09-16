export default function handler(req: any, res: any) {
  res.status(200).json({ 
    message: 'Authentication System API - Root endpoint working!', 
    status: 'success',
    timestamp: new Date().toISOString()
  });
}