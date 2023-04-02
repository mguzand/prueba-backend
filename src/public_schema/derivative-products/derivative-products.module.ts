import { Module } from '@nestjs/common';
import { DerivativeProductsService } from './derivative-products.service';
import { DerivativeProductsController } from './derivative-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DerivativeProduct } from './entities/derivative-product.entity';
import { FuelModule } from '../fuel/fuel.module';
import { TripsModule } from '../trips/trips.module';

@Module({
  controllers: [DerivativeProductsController],
  imports: [
    TypeOrmModule.forFeature([DerivativeProduct]),
    TripsModule
  ],
  exports: [
    DerivativeProductsService
  ],
  providers: [DerivativeProductsService]
})
export class DerivativeProductsModule {}
