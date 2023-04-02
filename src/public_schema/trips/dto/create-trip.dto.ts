import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";


export class CreateTripDto {

    //--------------------------------Validar nombre que tenga dato------------------------------//
    @ApiProperty()
    @IsNotEmpty({ message: 'Se debe especificar el lugar de destino.' })
    lugar_de_destino: string;

    @ApiProperty()
    @IsIn(['emisiones directas','emisiones indirectas','otras emisiones indirectas'])
    tipo_de_emision: string;


    
}
