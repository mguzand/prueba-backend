import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DerivativeProductsService } from './derivative-products.service';
import { CreateDerivativeProductDto } from './dto/create-derivative-product.dto'; 

@Controller('derivative-products')
@ApiTags('Productos derivados')
export class DerivativeProductsController {
  constructor(private readonly derivativeProductsService: DerivativeProductsService) {}

  @Post()
  create(@Body() createDerivativeProductDto: CreateDerivativeProductDto) {
    return this.derivativeProductsService.create(createDerivativeProductDto);
  }

  @Get('average-of-monthly-use-of-derivative-products')
  getProduct(){
    return this.derivativeProductsService.PercentageProduct()
  }


  @Get('oils-monthly')
  OilsMonthly(){
    return this.derivativeProductsService.OilsMonthly();
  }

  @Get('comparative-trips-products')
  comparatives(){
    return this.derivativeProductsService.comparative();
  }
  
}
