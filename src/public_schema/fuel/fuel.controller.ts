import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FuelService } from './fuel.service';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { UpdateFuelDto } from './dto/update-fuel.dto';

@Controller('fuel')
@ApiTags('combustibles')
export class FuelController {
  constructor(private readonly _fuelService: FuelService) {}

    @Post()
    @ApiBasicAuth()
    create( @Body() data: CreateFuelDto) {
        return this._fuelService.create(data);
    }


  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFuelDto: UpdateFuelDto
  ){
    return this._fuelService.update(+id, updateFuelDto)
  }




    @Get('annual-percentage')
    getAnnual(){
      return this._fuelService.annualPercentage()
    }


    @Get('month-gallons')
    getmonth(){
      return this._fuelService.MONTHGal()
    }

    @Get('max-segment')
    getMaxSegment(){
      return this._fuelService.annualPercentageMax()
    }


    @Get('minor-major-month')
    minorMajorMonth(){
      return this._fuelService.minorMajorMonth()
    }


    @Get('comparative-fuel-electric')
    comparative(){
      return this._fuelService.comparative()
    }



}