import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { CreateKudosDetails } from '../dsl/models/create_kudos';
import { expect } from '@playwright/test';

Given('a user must be logged in', async function (this: CustomWorld) {
  if (!this.loginDSL) {
    throw new Error('DSL not initialized');
  }
  await this.loginDSL.mustBeLoggedIn();
});

Given('create kudos service is available', async function (this: CustomWorld) {
  if (!this.createKudosDSL) {
    throw new Error('DSL not initialized');
  }
  await this.createKudosDSL.verifyCreateKudosServiceAvailable();
});

When('a team lead creates a kudos for a team member:', async function (this: CustomWorld, dataTable: any) {
  if (!this.createKudosDSL) {
    throw new Error('DSL not initialized');
  }
  const [kudosData] = dataTable.hashes();
  const details: CreateKudosDetails = {
    category: kudosData.Category,
    teamMember: kudosData.TeamMember,
    message: kudosData.Message,
  };
  await this.createKudosDSL.createKudos(details);
});

Then(
  'the kudos should be created with success message {string}',
  async function (this: CustomWorld, successMessage: string) {
    if (!this.createKudosDSL) {
      throw new Error('DSL not initialized');
    }
    const message = await this.createKudosDSL.verifyKudosCreatedSuccessfully();
    expect(message).toBe(successMessage);
  }
);
