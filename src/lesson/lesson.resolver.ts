import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { CreateLessonInput } from "./lesson.input";
import { AssignStudentsToLessonInput } from "./assing-students-to-lesson.input";
import { StudentService } from "src/student/student.service";
import { Lesson } from "./lesson.entity";

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) {}

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string
    ) {
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLesson') assignStudentsToLesson: AssignStudentsToLessonInput,
    ) {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLesson)
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }

}