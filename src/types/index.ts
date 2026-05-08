export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface AuthRequest extends express.Request {
  user?: JwtPayload;
}