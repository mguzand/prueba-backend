import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectricPowerService } from '../electric-power/electric-power.service';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';
import { Fuel } from './entities/fuel.entity';

@Injectable()
export class FuelService {
  
  constructor(
    @InjectRepository(Fuel)
    private _fuel: Repository<Fuel>,
    private _electricPowerService: ElectricPowerService
  ){}


  async create(createFuelDto: CreateFuelDto) {

    const createFuel = this._fuel.create(createFuelDto);
    return await this._fuel.save( createFuel );

  }

  async update(id: number, updateFuelDto: UpdateFuelDto){
      
    const data = await this._fuel.preload({
      id_combustible: id,
      ...updateFuelDto
    });

    if(!data) throw new NotFoundException(`no existe el id ${ id } en la base de datos`)
    
    return await this._fuel.save( data );
  }






  async annualPercentage(){
    const data = await this._fuel.createQueryBuilder('s')
    .select("SUM(s.administrativo) AS administrativo")
    .addSelect("SUM(s.indirecto_de_proveedor) AS indirecto_de_proveedor")
    .addSelect("SUM(s.logistica) AS logistica")
    .getRawOne();

    data.logistica = data.logistica/100;
    data.administrativo = data.administrativo/100;
    data.indirecto_de_proveedor = data.indirecto_de_proveedor/100;


    return data;
  }


  async annualPercentageMax(){
    const data = await this._fuel.createQueryBuilder('s')
    .select("SUM(s.administrativo) AS administrativo")
    .addSelect("SUM(s.indirecto_de_proveedor) AS indirecto_de_proveedor")
    .addSelect("SUM(s.logistica) AS logistica")
    .getRawOne();

    data.logistica = data.logistica/100;
    data.administrativo = data.administrativo/100;
    data.indirecto_de_proveedor = data.indirecto_de_proveedor/100;

    if(data.administrativo > data.indirecto_de_proveedor && data.administrativo > data.logistica) 
        return {
          administrativo:data.administrativo
        };
    
    if(data.indirecto_de_proveedor > data.administrativo && data.indirecto_de_proveedo > data.logistica) 
    return {
      indirecto_de_proveedor:data.indirecto_de_proveedor
    };

    if(data.logistica > data.administrativo && data.indirecto_de_proveedor > data.administrativo) 
    return {
      logistica:data.logistica
    };


    return data;
  }


  async MONTHGal(){
    const data = await this._fuel.createQueryBuilder('s')
    .select("SUM(s.administrativo) AS administrativo")
    .addSelect("SUM(s.indirecto_de_proveedor) AS indirecto_de_proveedor")
    .addSelect("SUM(s.logistica) AS logistica")
    .addSelect("SUM((s.administrativo + s.indirecto_de_proveedor + s.logistica) / 3)   AS Promedio   ")
    .addSelect("TO_CHAR(fecha_creacion, 'mm') AS mes")
    .groupBy("TO_CHAR(fecha_creacion, 'mm')")
    .getRawMany()

   // .getRawOne();
    
    return data;
  }


  async minorMajorMonth(){
    const data = await this._fuel.createQueryBuilder('s')
    .select("SUM(s.administrativo + s.indirecto_de_proveedor + s.logistica) AS total")
    .addSelect("TO_CHAR(fecha_creacion, 'mm') AS mes")
    .groupBy("TO_CHAR(fecha_creacion, 'mm')")
    .getRawMany()


    const max = Math.max(...data.map(o => o.total));
    const min = Math.min(...data.map(o => o.total));

     
    return {
      mayor: {
        toral: max,
        mes: data.filter(s=>  s.total == max)[0].mes
      },
      menor: {
        toral: min,
        mes: data.filter(s=>  s.total == min)[0].mes
      }
    };
  }



  async comparative(){
    const dataElectric = await this._electricPowerService._electricPowerGet.createQueryBuilder('s')
    .select("SUM(s.administrativo + s.distribucion + s.logistico) AS total")
    .addSelect("TO_CHAR(fecha_creacion, 'mm') AS mes")
    .groupBy("TO_CHAR(fecha_creacion, 'mm')")
    .getRawMany()

    const data = await this._fuel.createQueryBuilder('s')
    .select("SUM(s.administrativo + s.indirecto_de_proveedor + s.logistica) AS total")
    .addSelect("TO_CHAR(fecha_creacion, 'mm') AS mes")
    .groupBy("TO_CHAR(fecha_creacion, 'mm')")
    .getRawMany()


    const comparative =  data.map((items) => {
        const ele = dataElectric.filter(s => s.mes == items.mes);
        let electric = 0;
       if(ele.length != 0)
         electric = ele[0].total

        return {
          combustible: (items.total/100),
          electicidad: (electric/100),
          mes: items.mes
        }
    });


    return comparative



  }



  async refrigerantLosses(){
    const data = await this._fuel.createQueryBuilder('s')
    .select("SUM(s.administrativo + s.indirecto_de_proveedor + s.logistica) AS total")
    .addSelect("TO_CHAR(fecha_creacion, 'mm') AS mes")
    .groupBy("TO_CHAR(fecha_creacion, 'mm')")
    .where('tipo_de_emision = :id', { id: 'emisiones indirectas' })
    .getRawMany()

    return data
  }



  
}
