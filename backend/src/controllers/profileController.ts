import { Request, Response } from 'express';
import { getUserProfile } from '../services/profileService';

export async function getProfile(req: Request, res: Response) {
  return getUserProfile(req, res);
}
