import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
//       Entity combustible sincronizar en true para      sincronizacion con el shema   //
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑//
@Entity('viajes', { synchronize: true })


export class Trip {

    @PrimaryGeneratedColumn({ type: 'smallint' })
    id_viaje: number;


    @Column({ type: 'varchar', length: 200, nullable: false })
    lugar_de_destino: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    tipo_de_emision: string;

    @Column({ type: 'timestamp', nullable: true })
    fecha_creacion?: Date;

    @Column({ type: 'timestamp', nullable: true })
    fecha_modificacion?: Date;

    //------------------ inresar fecha por default al crear insert ------------------// 
    @BeforeInsert()
    setDefaultDates() {
        const date = new Date();
        this.fecha_creacion = date;
        this.fecha_modificacion = date;
    }

    //---------------- Actualizar fecha por default al crear insert ----------------// 
    @BeforeUpdate()
    setDefaultDate() {
        this.fecha_modificacion = new Date();
    }
}
