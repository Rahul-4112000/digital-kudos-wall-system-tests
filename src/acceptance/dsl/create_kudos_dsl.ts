import { CreateKudosDriver } from '../drivers/create_kudos_driver.interface';
import { CreateKudosDetails } from './models/create_kudos';

export class CreateKudosDSL {
  constructor(private readonly createKudosDriver: CreateKudosDriver) {}

  async verifyCreateKudosServiceAvailable(): Promise<void> {
    await this.createKudosDriver.verifyCreateKudosServiceAvailable();
  }

  async createKudos(details: CreateKudosDetails): Promise<void> {
    await this.createKudosDriver.giveKudos(details);
  }

  async verifyKudosCreatedSuccessfully(): Promise<string> {
    return await this.createKudosDriver.getKudosCreatedSuccessfullyMessage();
  }
}
