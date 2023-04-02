import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
//       Entity Electricidad sincronizar en true para     sincronizacion con el shema   //
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑//
@Entity('energia_eléctrica', { synchronize: true })

export class ElectricPower {

    @PrimaryGeneratedColumn({ type: 'smallint' })
    id_energia_electrica: number;

    @Column({ type: 'int2', nullable: false })
    administrativo: number;

    @Column({ type: 'int2', nullable: false })
    distribucion: number;

    @Column({ type: 'int2', nullable: false })
    logistico: number;

    @Column({ type: 'varchar', length: 60, nullable: false })
    tipo_de_emision: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    tipo_de_consumo: string;

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
