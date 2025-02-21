import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, {
  IConfiguration,
  IDatabaseConfiguration,
} from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './resources/auth/guards/jwt-auth/jwt-auth.guard';
import { UsersService } from './resources/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfiguration>) => {
        const dbConfig = configService.get<IDatabaseConfiguration>('database');
        return {
          dialect: 'postgres',
          host: dbConfig.host,
          port: +dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          autoLoadModels: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    UsersService,
  ],
})
export class AppModule {}
