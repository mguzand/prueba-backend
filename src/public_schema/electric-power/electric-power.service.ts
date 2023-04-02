import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateElectricPowerDto } from './dto/create-electric-power.dto'; 
import { ElectricPower } from './entities/electric-power.entity';

@Injectable()
export class ElectricPowerService {


    constructor(
        @InjectRepository(ElectricPower)
        private _electricPower: Repository<ElectricPower>,
      ){}
    
    
      async create(createElectricPowerDto: CreateElectricPowerDto) {
    
        const createFuel = this._electricPower.create(createElectricPowerDto);
        return await this._electricPower.save( createFuel );
    
      }


      get _electricPowerGet(){
          return this._electricPower;
      }



      async electricConsumption(){
        const data = await this._electricPower.createQueryBuilder('s')

        .select("SUM(s.administrativo) AS administrativo")
        .addSelect("SUM(s.distribucion) AS distribucion")
        .addSelect("SUM(s.logistico) AS logistico")
        .where('tipo_de_consumo = :id', { id: 'planta' })
        .getRawOne();
        
        return data;
      }





      
   
}
