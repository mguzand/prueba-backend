import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectricPowerService } from './electric-power.service';
import { CreateElectricPowerDto } from './dto/create-electric-power.dto'; 
import {  ApiTags } from '@nestjs/swagger';

@Controller('electric-power')
@ApiTags('electricidad')
export class ElectricPowerController {
  constructor(private readonly electricPowerService: ElectricPowerService) {}

  @Post()
  create( @Body() data: CreateElectricPowerDto) {
      return this.electricPowerService.create(data);
  }


  @Get('electric-consumption')
  electricConsumption(){
    return this.electricPowerService.electricConsumption();
  }


  



}
