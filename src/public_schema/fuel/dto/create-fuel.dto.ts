import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";




export class CreateFuelDto {


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el combustible administrativo.' })
    administrativo: number;


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el combustible indirecto_de_proveedor.' })
    indirecto_de_proveedor: number;


    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el combustible de logística.' })
    logistica: number;


    @ApiProperty()
    @IsIn(['emisiones directas','emisiones indirectas','otras emisiones indirectas'])
    tipo_de_emision: string;


    
}
