import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDerivativeProductDto } from './dto/create-derivative-product.dto'; 
import { DerivativeProduct } from './entities/derivative-product.entity';

@Injectable()
export class DerivativeProductsService {

  constructor(
    @InjectRepository(DerivativeProduct)
    private _derivativeProduct: Repository<DerivativeProduct>,
  ){}


  
  async create(createDerivativeProductDto: CreateDerivativeProductDto) {

    const createFuel = this._derivativeProduct.create(createDerivativeProductDto);
    return await this._derivativeProduct.save( createFuel );

  }



  async PercentageProduct(){
    const data = await this._derivativeProduct.createQueryBuilder('s')
    .select("SUM((s.administrativo + s.logistico + operacion)) AS consumo")
    .addSelect('s.tipo_de_consumo AS tipo')
    .groupBy("s.tipo_de_consumo")
    .getRawMany();

    return data.map((m) => {
        return {
            s: m.consumo / 100,
            m: m.tipo
        }
    })

  }



  async OilsMonthly(){
    const data = await this._derivativeProduct.createQueryBuilder('s')

    .select("TO_CHAR(fecha_creacion, 'mm') AS mes")
    .addSelect("SUM((s.administrativo + s.logistico + operacion)) AS consumo")
    .groupBy("TO_CHAR(fecha_creacion, 'mm')")

    .where("tipo_de_consumo = :type", { type: 'aceite' })
    .getRawMany()

    return data

    
  }

   
}
