import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;
      case "assignment":
        const assignmentLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: assignmentLessons };
        break;

      default:
        break;
    }
  }

  if (type === "delete" && id) {
    // provide counts of dependent rows so the UI can block unsafe deletes
    switch (table) {
      case "class": {
        const studentCount = await prisma.student.count({
          where: { classId: Number(id) },
        });
        const lessonCount = await prisma.lesson.count({
          where: { classId: Number(id) },
        });
        const eventCount = await prisma.event.count({
          where: { classId: Number(id) },
        });
        const announcementCount = await prisma.announcement.count({
          where: { classId: Number(id) },
        });
        relatedData = {
          counts: {
            students: studentCount,
            lessons: lessonCount,
            events: eventCount,
            announcements: announcementCount,
          },
        };
        break;
      }
      case "teacher": {
        const lessonCount = await prisma.lesson.count({
          where: { teacherId: String(id) },
        });
        const classCount = await prisma.class.count({
          where: { supervisorId: String(id) },
        });
        const subjectCount = await prisma.subject.count({
          where: { teachers: { some: { id: String(id) } } },
        });
        relatedData = {
          counts: {
            lessons: lessonCount,
            classes: classCount,
            subjects: subjectCount,
          },
        };
        break;
      }
      case "subject": {
        const lessonCount = await prisma.lesson.count({
          where: { subjectId: Number(id) },
        });
        relatedData = { counts: { lessons: lessonCount } };
        break;
      }
      case "student": {
        const resultCount = await prisma.result.count({
          where: { studentId: String(id) },
        });
        const attendanceCount = await prisma.attendance.count({
          where: { studentId: String(id) },
        });
        relatedData = {
          counts: { results: resultCount, attendances: attendanceCount },
        };
        break;
      }
      case "parent": {
        const studentCount = await prisma.student.count({
          where: { parentId: String(id) },
        });
        relatedData = { counts: { students: studentCount } };
        break;
      }
      default: {
        relatedData = { counts: {} };
        break;
      }
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
