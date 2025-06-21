import type { AuthFormData, AuthResponseData } from "@/model/auth.model";
import { ApiService } from "./api.service";
import type { BaseUser } from "@/model/user.model";

export default class AuthService extends ApiService {
  resource = 'auth'

  login(formData: AuthFormData) {
    return AuthService.api
      .post<AuthResponseData>(`${this.apiVersion}/${this.resource}/login`, formData)
      .then(res => {
        return {
          accessToken: this.transformToken(res.data.access_token),
          refreshToken: this.transformToken(res.data.refresh_token),
        }
      })
  }

  register(formData: AuthFormData) {
    return AuthService.api
      .post<AuthResponseData>(`${this.apiVersion}/${this.resource}/register`, formData)
      .then(res => {
        return {
          accessToken: this.transformToken(res.data.access_token),
          refreshToken: this.transformToken(res.data.refresh_token),
        }
      })
  }

  refresh(token: string) {
    AuthService.setAuthToken(token);
    return AuthService.api
      .post<AuthResponseData>(`${this.apiVersion}/${this.resource}/refresh-token`)
      .then(res => {
        return {
          accessToken: this.transformToken(res.data.access_token),
          refreshToken: this.transformToken(res.data.refresh_token),
        }
      })
  }

  getUser() {
    return AuthService.api
      .get<BaseUser>(`${this.apiVersion}/user`)
      .then(res => res.data);
  }

  restart() {
    return AuthService.api.post(`${this.apiVersion}/user/restart`);
  }

  logout() {
    return AuthService.api.post(`${this.apiVersion}/${this.resource}/logout`);
  }

  transformToken(tokenData: { token: string; expiresIn: string }) {
    const min = 60 * 1000;
    const expiresAt = Date.now() + parseInt(tokenData.expiresIn) - (10 * min);
    return {
      token: tokenData.token,
      expiresAt: new Date(expiresAt).toISOString(),
    }
  }
}