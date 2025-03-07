import { IsNotEmpty, IsString, IsNumber, Min, Max, IsEmail, IsPhoneNumber, IsArray, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    age: number;

    @IsNotEmpty()
    @IsString()
    grade: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    parentName: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    parentContact: string;

    @IsOptional()
    @IsDateString()
    enrollmentDate?: Date;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    subjects?: string[];

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 