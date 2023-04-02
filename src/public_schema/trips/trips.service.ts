import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {

  constructor(
    @InjectRepository(Trip)
    private _trip: Repository<Trip>,
  ){}

  async create(createTripDto: CreateTripDto) {

    const createFuel = this._trip.create(createTripDto);
    return await this._trip.save( createFuel );

  }


  get _tripGet(){
    return this._trip;
}




  

}
