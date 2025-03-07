import { Controller, Get, Param, Logger } from '@nestjs/common';
import { SolanaService } from './solana.service';

@Controller('solana')
export class SolanaController {
  private readonly logger = new Logger(SolanaController.name);

  constructor(private readonly solanaService: SolanaService) {}

  @Get('balance/:address')
  async getBalance(@Param('address') address: string) {
    this.logger.log(`Received balance request for address: ${address}`);
    try {
      const balance = await this.solanaService.getBalance(address);
      return {
        success: true,
        data: balance
      };
    } catch (error) {
      this.logger.error(`Error in controller: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }
}
