import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>
    ) {
        // Add initial dummy data
        this.initializeDummyData();
    }

    private async initializeDummyData() {
        const count = await this.studentModel.countDocuments();
        if (count === 0) {
            const dummyStudents = [
                {
                    name: "John Doe",
                    age: 20,
                    grade: "A+",
                    email: "john.doe@example.com",
                    phoneNumber: "+1234567890",
                    address: "123 Main St, City",
                    parentName: "Jane Doe",
                    parentContact: "+1234567891",
                    subjects: ["Math", "Science", "English"],
                    isActive: true
                },
                {
                    name: "Jane Smith",
                    age: 19,
                    grade: "B",
                    email: "jane.smith@example.com",
                    phoneNumber: "+1234567892",
                    address: "456 Oak St, City",
                    parentName: "John Smith",
                    parentContact: "+1234567893",
                    subjects: ["History", "Literature", "Art"],
                    isActive: true
                }
            ];

            await this.studentModel.insertMany(dummyStudents);
        }
    }

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const createdStudent = new this.studentModel(createStudentDto);
        return createdStudent.save();
    }

    async findAll(): Promise<Student[]> {
        return this.studentModel.find().exec();
    }

    async findOne(id: string): Promise<Student> {
        const student = await this.studentModel.findById(id).exec();
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }

    async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const updatedStudent = await this.studentModel
            .findByIdAndUpdate(id, updateStudentDto, { new: true })
            .exec();
        
        if (!updatedStudent) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return updatedStudent;
    }

    async remove(id: string): Promise<void> {
        const result = await this.studentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
    }
} 