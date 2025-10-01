import { login, register, getCurrentUser } from './api';

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_active: boolean;
}

export class AuthService {
  private static TOKEN_KEY = 'projectpro_token';
  private static USER_KEY = 'projectpro_user';

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static getUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static setUser(user: AuthUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static async login(username: string, password: string): Promise<AuthUser> {
    try {
      const tokenData = await login(username, password);
      this.setToken(tokenData.access_token);
      
      const user = await getCurrentUser(tokenData.access_token);
      this.setUser(user);
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData: {
    email: string;
    username: string;
    full_name: string;
    password: string;
  }): Promise<AuthUser> {
    try {
      const user = await register(userData);
      // Après l'inscription, connecter automatiquement l'utilisateur
      return await this.login(userData.username, userData.password);
    } catch (error) {
      throw error;
    }
  }

  static logout(): void {
    this.removeToken();
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  static async validateToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const user = await getCurrentUser(token);
      this.setUser(user);
      return true;
    } catch (error) {
      this.removeToken();
      return false;
    }
  }
}