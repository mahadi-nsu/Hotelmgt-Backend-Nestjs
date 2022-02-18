import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
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
    // DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
