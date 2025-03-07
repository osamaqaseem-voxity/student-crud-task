import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schemas/student.schema';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post()
    async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentsService.create(createStudentDto);
    }

    @Get()
    async findAll(): Promise<Student[]> {
        return this.studentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Student> {
        return this.studentsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateStudentDto: UpdateStudentDto,
    ): Promise<Student> {
        return this.studentsService.update(id, updateStudentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.studentsService.remove(id);
    }
} 