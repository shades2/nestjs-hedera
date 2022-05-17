import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HederaService {
  protected logger: Logger = new Logger("Hedera Service");
}
