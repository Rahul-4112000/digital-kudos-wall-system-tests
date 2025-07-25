import { APIResponse, request } from '@playwright/test';
import { LoginDriver } from '../login_driver.interface';
import { CONFIG } from '../../../config/test.config';
import { LoginCredentials } from '../../dsl/models/login';

export class LoginApiDriver implements LoginDriver {
  private isLoginSuccess: boolean = false;
  private loginErrorMessage: string | undefined;
  async checkServiceHealth(): Promise<void> {
    const context = await request.newContext();
    const response = await context.get(`${CONFIG.apiUrl}/health`);
    if (response.status() !== 200) {
      throw new Error('Registration service is not available');
    }
  }
  async createTestUser(credentials: LoginCredentials): Promise<void> {
    const context = await request.newContext();
    const response = await context.post(`${CONFIG.apiUrl}/test-support/users`, {
      data: {
        name: 'Test User',
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (response.status() !== 201 && response.status() !== 200) {
      throw new Error(`Failed to create test user: ${response.statusText()}`);
    }
  }
  async login(credentials: LoginCredentials): Promise<void> {
    const context = await request.newContext();
    const response = await context.post(`${CONFIG.apiUrl}/users/login`, {
      data: credentials,
    });

    if (response.status() !== 200) {
      await this.message(response);
    } else {
      this.isLoginSuccess = true;
    }
  }
  async message(response: APIResponse) {
    const errorData = await response.json();
    this.loginErrorMessage = errorData.message;
  }
  async cleanup(): Promise<void> {
    const context = await request.newContext();
    try {
      const response = await context.delete(`${CONFIG.apiUrl}/test-support/cleanup`);
      if (!response.ok()) {
        console.warn(`Cleanup failed with status ${response.status()}: ${await response.text()}`);
      }
    } catch (error) {
      console.warn('Failed to cleanup test data:', error);
    }
  }

  async getLoginErrorMessage(): Promise<string> {
    if (!this.loginErrorMessage) {
      return '';
    }
    return this.loginErrorMessage;
  }

  async isLoginSuccessful(): Promise<boolean> {
    return this.isLoginSuccess;
  }

  async isKudosWallVisible(): Promise<boolean> {
    return true;
  }
}
