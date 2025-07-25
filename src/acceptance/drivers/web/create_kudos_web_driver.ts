import { CreateKudosDriver } from '../create_kudos_driver.interface';
import { Page } from '@playwright/test';
import { CreateKudosPage } from './pages/create_kudos.page';
import { PageFactory } from './pages/page.factory';
import { CreateKudosDetails } from '@/acceptance/dsl/models/create_kudos';

export class CreateKudosWebDriver implements CreateKudosDriver {
  private readonly createKudosPage: CreateKudosPage;
  private successMessage: string | null = null;

  constructor(private readonly page: Page) {
    this.createKudosPage = PageFactory.createCreateKudosPage(page);
  }

  async verifyCreateKudosServiceAvailable(): Promise<void> {
    await this.createKudosPage.navigate();
  }

  async giveKudos(details: CreateKudosDetails): Promise<void> {
    const message = await this.createKudosPage.fillAndSubmitKudosForm(details);
    if (!message) {
      throw new Error('Kudos creation failed');
    }
    this.successMessage = message;
  }

  async getKudosCreatedSuccessfullyMessage(): Promise<string> {
    if (!this.successMessage) {
      return 'message not found!';
    }
    return this.successMessage;
  }
}
