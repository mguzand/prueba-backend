import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";


export class CreateElectricPowerDto {


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el consumo administrativo.' })
    administrativo: number;


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el consumo distribucion.' })
    distribucion: number;


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el consumo de logistico.' })
    logistico: number;


    @ApiProperty()
    @IsIn(['emisiones directas','emisiones indirectas','otras emisiones indirectas'])
    tipo_de_emision: string;

    @ApiProperty()
    @IsIn(['planta','local','otro'])
    tipo_de_consumo: string;
    
}
