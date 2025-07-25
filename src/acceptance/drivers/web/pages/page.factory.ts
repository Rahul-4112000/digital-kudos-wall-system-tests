import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { AccountRegistrationPage } from './account_registration.page';
import { CreateKudosPage } from './create_kudos.page';

export class PageFactory {
  static createAccountRegistrationPage(page: Page): AccountRegistrationPage {
    return new AccountRegistrationPage(page);
  }

  static createLoginPage(page: Page): LoginPage {
    return new LoginPage(page);
  }

  static createCreateKudosPage(page: Page): CreateKudosPage {
    return new CreateKudosPage(page);
  }
}
