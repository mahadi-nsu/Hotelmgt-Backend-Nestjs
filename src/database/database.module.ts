import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('NODE_ENV') === 'test'
            ? configService.get<string>('MONGODB_URI_TEST')
            : configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log(`MongoDB connected with database: ${connection.name}`);
          });
          connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
          });
          connection.on('error', (error) => {
            console.log('MongoDB connection failed! for error: ', error);
          });

          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
