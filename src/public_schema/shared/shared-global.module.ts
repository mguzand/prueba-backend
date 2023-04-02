import { Module } from "@nestjs/common";
import { DerivativeProductsModule } from "../derivative-products/derivative-products.module";
import { ElectricPowerModule } from "../electric-power/electric-power.module";
import { FuelModule } from "../fuel/fuel.module";
import { TripsModule } from "../trips/trips.module";

@Module({
    imports: [
        FuelModule,
        ElectricPowerModule,
        DerivativeProductsModule,
        TripsModule
    ],
    exports: [
        FuelModule,
        ElectricPowerModule,
        DerivativeProductsModule,
        TripsModule
    ]
})


export class sharedGlobalModule {}