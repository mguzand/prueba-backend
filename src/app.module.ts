import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sharedGlobalModule } from './public_schema/shared/shared-global.module';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ////////////////////////////////////////////////////////////////////////////////
    // ----------------------Configuracion de base de datos---------------------- //
    ////////////////////////////////////////////////////////////////////////////////
    TypeOrmModule .forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        port: parseInt(config.get<string>('DB_PORT')),
        host: config.get<string>('DB_HOST'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        schema: 'public'
      })
    }),
      ////////////////////////////////////////////////////////////////////////////////
      // ----------------Importacion de los modulos de base de dato---------------- //
      ////////////////////////////////////////////////////////////////////////////////
    sharedGlobalModule
  ],
  controllers: [],
  providers: [],
 
})
export class AppModule {}
