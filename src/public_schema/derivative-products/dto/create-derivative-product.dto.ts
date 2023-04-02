import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class CreateDerivativeProductDto {


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el consumo administrativo.' })
    administrativo: number;


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el consumo logistico.' })
    logistico: number;


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el consumo operacion.' })
    operacion: number;

    @ApiProperty()
    @IsIn(['combustible','aceite','otro'])
    tipo_de_consumo: string;


    @ApiProperty()
    @IsIn(['emisiones directas','emisiones indirectas','otras emisiones indirectas'])
    tipo_de_emision: string;

}
