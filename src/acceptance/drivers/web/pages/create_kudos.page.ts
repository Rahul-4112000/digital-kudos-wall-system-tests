import { Page } from '@playwright/test';
import { BasePage } from '../../../../shared/pages/base.page';
import { CONFIG } from '../../../../config/test.config';
import { CreateKudosDetails } from '@/acceptance/dsl/models/create_kudos';

export class CreateKudosPage extends BasePage {
  private readonly createKudosFormElement = '[data-testid="create-kudos-form"]';
  private readonly categoryDropdownElement = '[data-testid="category-select"]';
  private readonly teamMemberDropdownElement = '[data-testid="team-member-select"]';
  private readonly messageInputElement = '[data-testid="message-input"]';
  private readonly submitButtonElement = '[data-testid="create-kudos-submit"]';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${CONFIG.baseUrl}/create-kudo`);
    await this.page.waitForSelector(this.createKudosFormElement);
  }

  async fillAndSubmitKudosForm(details: CreateKudosDetails): Promise<string | null> {
    await this.page.getByTestId('category-select').getByRole('combobox').click();
    await this.page.getByTestId('brilliant-idea-category').click();

    await this.page.getByTestId('team-member-select').getByRole('combobox').click();
    await this.page.getByTestId('kevin-smith-member').click();

    await this.page.getByTestId('kudos-message-input').fill(details.message);

    await this.page
      .locator('div')
      .filter({ hasText: /^CREATE KUDOS$/ })
      .click();
    return await this.page.getByText('Kudos created successfully').textContent();
  }

  async getSuccessMessage() {
    //
  }

  // private async selectFromDropdown(dropdownSelector: string, optionText: string): Promise<void> {
  //   await this.page.getByTestId('category-select').getByRole('combobox').click();
  //   await this.page.getByTestId('brilliant-idea-category').click();
  // }
}
