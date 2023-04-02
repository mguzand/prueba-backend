import { PartialType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";
import { CreateFuelDto } from "./create-fuel.dto";

 


export class UpdateFuelDto {
    @IsOptional()
    administrativo: number;


    @IsOptional()
    indirecto_de_proveedor: number;


    @IsOptional()
    logistica: number;
 


}