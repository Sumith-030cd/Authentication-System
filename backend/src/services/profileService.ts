import { Request, Response } from 'express';
import { User } from '../models/User';

export async function getUserProfile(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(userId).select('_id name email isVerified role createdAt updatedAt');
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}
