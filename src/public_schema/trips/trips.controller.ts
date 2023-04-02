import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('trips')
@ApiTags('viajes')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }
}
