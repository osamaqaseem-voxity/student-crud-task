import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, min: 0, max: 100 })
    age: number;

    @Prop({ required: true })
    grade: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    parentName: string;

    @Prop({ required: true })
    parentContact: string;

    @Prop({ default: Date.now })
    enrollmentDate: Date;

    @Prop({ type: [String], default: [] })
    subjects: string[];

    @Prop({ default: true })
    isActive: boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student); 