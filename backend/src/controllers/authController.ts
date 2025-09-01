import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response) {
  return authService.register(req, res);
}

export async function login(req: Request, res: Response) {
  return authService.login(req, res);
}

export async function logout(req: Request, res: Response) {
  return authService.logout(req, res);
}

export async function refresh(req: Request, res: Response) {
  return authService.refresh(req, res);
}

export async function verifyEmail(req: Request, res: Response) {
  return authService.verifyEmail(req, res);
}

export async function requestPasswordReset(req: Request, res: Response) {
  return authService.requestPasswordReset(req, res);
}

export async function resetPassword(req: Request, res: Response) {
  return authService.resetPassword(req, res);
}
