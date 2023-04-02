import { Module } from '@nestjs/common';
import { FuelService } from './fuel.service';
import { FuelController } from './fuel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './entities/fuel.entity';
import { ElectricPowerModule } from '../electric-power/electric-power.module';

@Module({
  controllers: [FuelController],
  imports: [
    TypeOrmModule.forFeature([Fuel]),
    ElectricPowerModule
  ],
  exports: [
    FuelService
  ],
  providers: [FuelService]
})
export class FuelModule {}
