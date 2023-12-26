import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { IInfoUser } from 'src/interfaces/user';

export type InfoUserDocument = HydratedDocument<InfoUser>

@Schema()
export class InfoUser implements IInfoUser {
  
    @Prop() userId: string
 
    @Prop() firstName: string
 
    @Prop() lastName: string
 
    @Prop() age: number

    @Prop() birthDay: string
 
    @Prop() citizen: string

}
export const InfoUserSchema = SchemaFactory.createForClass(InfoUser);