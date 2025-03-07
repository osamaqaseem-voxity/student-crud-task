import { Injectable, Logger } from '@nestjs/common';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

@Injectable()
export class SolanaService {
  private connection: Connection;
  private readonly logger = new Logger(SolanaService.name);

  constructor() {
    this.logger.log('Initializing Solana Service...');
    this.connection = new Connection('https://api.mainnet-beta.solana.com');
    this.logger.log('Solana Service initialized');
  }

  async getBalance(address: string): Promise<{ sol: number; lamports: number }> {
    try {
      this.logger.log(`Fetching balance for address: ${address}`);
      
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      
      this.logger.log(`Balance in Lamports: ${balance}`);
      const solBalance = parseFloat((balance / LAMPORTS_PER_SOL).toFixed(5));
      this.logger.log(`Balance in SOL: ${solBalance}`);

      return {
        sol: solBalance,
        lamports: balance
      };
    } catch (error) {
      this.logger.error(`Error fetching balance: ${error.message}`);
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }
}
