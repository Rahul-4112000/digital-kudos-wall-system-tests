import { CreateKudosDetails } from '../dsl/models/create_kudos';

export interface CreateKudosDriver {
  verifyCreateKudosServiceAvailable(): Promise<void>;
  giveKudos(details: CreateKudosDetails): Promise<void>;

  getKudosCreatedSuccessfullyMessage(): Promise<string>;
}
