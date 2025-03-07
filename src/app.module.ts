import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import configuration from './config/configuration';
import mongoose from 'mongoose';
import { SolanaModule } from './students/solana.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('database.uri') ?? 'mongodb://localhost:27017/students-db';
        console.log('Attempting to connect to MongoDB...');
        
        try {
          await mongoose.connect(uri);
          console.log('MongoDB connected successfully');
        } catch (error) {
          console.error('MongoDB connection error:', error);
        }
        
        return {
          uri,
          connectionFactory: (connection) => {
            mongoose.set('debug', true);
            return connection;
          }
        };
      },
      inject: [ConfigService],
    }),
    StudentsModule,
    SolanaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    console.log('Checking MongoDB connection status...');
    const mongooseConnection = mongoose.connection;
    console.log('Connection state:', mongooseConnection.readyState);
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    console.log('Connection status:', states[mongooseConnection.readyState]);
  }
}
