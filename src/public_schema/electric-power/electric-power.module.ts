import { Module } from '@nestjs/common';
import { ElectricPowerService } from './electric-power.service';
import { ElectricPowerController } from './electric-power.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectricPower } from './entities/electric-power.entity';

@Module({
  controllers: [ElectricPowerController],
  imports: [
    TypeOrmModule.forFeature([ElectricPower])
  ],
  exports: [
    ElectricPowerService
  ],
  providers: [ElectricPowerService]
})
export class ElectricPowerModule {}
