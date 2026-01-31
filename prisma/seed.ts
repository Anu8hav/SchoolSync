import "dotenv/config";
import { Day, PrismaClient, UserSex } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const now = new Date();

  // 1. ADMIN
  await prisma.admin.upsert({
    where: { username: "admin1" },
    update: {},
    create: { id: "admin1", username: "admin1" },
  });

  // 2. GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.upsert({
      where: { level: i },
      update: {},
      create: { level: i },
    });
  }

  // 3. CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.upsert({
      where: { name: `${i}A` },
      update: {},
      create: {
        name: `${i}A`,
        gradeId: i,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // 4. SUBJECT
  const subjects = [
    "Math",
    "Science",
    "English",
    "History",
    "Physics",
    "Chemistry",
    "Art",
  ];
  for (const name of subjects) {
    await prisma.subject.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 5. TEACHER
  for (let i = 1; i <= 15; i++) {
    await prisma.teacher.upsert({
      where: { id: `teacher${i}` },
      update: {},
      create: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        birthday: new Date(
          now.getFullYear() - 35,
          now.getMonth(),
          now.getDate(),
        ),
      },
    });
  }

  // 6. LESSON (Today's schedule)
  for (let i = 1; i <= 30; i++) {
    const start = new Date(now);
    start.setHours(9 + (i % 6), 0, 0); // Staggered start times from 9 AM
    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    await prisma.lesson.create({
      data: {
        name: `Lesson ${i}`,
        day: Object.values(Day)[now.getDay() - 1] || Day.MONDAY,
        startTime: start,
        endTime: end,
        subjectId: (i % 7) + 1,
        classId: (i % 6) + 1,
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
  }

  // 7. PARENT & STUDENT
  for (let i = 1; i <= 25; i++) {
    const parent = await prisma.parent.upsert({
      where: { id: `parentId${i}` },
      update: {},
      create: {
        id: `parentId${i}`,
        username: `parent${i}`,
        name: `PName${i}`,
        surname: `PSurname${i}`,
        phone: `123-456-70${i}`,
        address: `Address${i}`,
      },
    });

    // Create 2 students per parent
    for (let j = 1; j <= 2; j++) {
      const sId = (i - 1) * 2 + j;
      await prisma.student.upsert({
        where: { id: `student${sId}` },
        update: {},
        create: {
          id: `student${sId}`,
          username: `student${sId}`,
          name: `SName${sId}`,
          surname: `SSurname${sId}`,
          bloodType: "O-",
          sex: sId % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          parentId: parent.id,
          gradeId: sId % 6 || 6,
          classId: sId % 6 || 6,
          address: `Address${sId}`,
          birthday: new Date(
            now.getFullYear() - 12,
            now.getMonth(),
            now.getDate(),
          ),
        },
      });
    }
  }

  // 8. EXAMS & ASSIGNMENTS (Set for today/tomorrow)
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(now.getTime() + 1000 * 60 * 60), // In 1 hour
        endTime: new Date(now.getTime() + 1000 * 60 * 120), // In 2 hours
        lessonId: i,
      },
    });

    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: now,
        dueDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
        lessonId: i,
      },
    });
  }

  // 9. EVENT & ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Happening today!`,
        startTime: now,
        endTime: new Date(now.getTime() + 1000 * 60 * 60 * 3),
        classId: i,
      },
    });

    await prisma.announcement.create({
      data: {
        title: `Notice ${i}`,
        description: `Please check the new schedule.`,
        date: now,
        classId: i,
      },
    });
  }

  // 10. ATTENDANCE DATA (Last 7 days, relevant to current time)
  const lessons = await prisma.lesson.findMany({ take: 6 }); // Only 6 lessons per day
  const students = await prisma.student.findMany({ take: 50 });

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const attendanceDate = new Date(now);
    attendanceDate.setDate(attendanceDate.getDate() - dayOffset);

    // Create attendance for each student in each lesson on this day
    for (const lesson of lessons) {
      for (const student of students) {
        const isPresent = Math.random() > 0.15; // 85% attendance rate
        await prisma.attendance.create({
          data: {
            date: attendanceDate,
            present: isPresent,
            studentId: student.id,
            lessonId: lesson.id,
          },
        });
      }
    }
  }

  // Quick count: 7 days × 6 lessons × 50 students = 2,100 records (more reasonable)

  // 11. RESULTS DATA (Exams and assignments with scores)
  const exams = await prisma.exam.findMany();
  const assignments = await prisma.assignment.findMany();

  // Results for exams
  for (const exam of exams) {
    for (const student of students.slice(0, 20)) {
      await prisma.result.create({
        data: {
          score: Math.floor(Math.random() * 101),
          examId: exam.id,
          studentId: student.id,
        },
      });
    }
  }

  // Results for assignments
  for (const assignment of assignments) {
    for (const student of students.slice(0, 20)) {
      await prisma.result.create({
        data: {
          score: Math.floor(Math.random() * 101),
          assignmentId: assignment.id,
          studentId: student.id,
        },
      });
    }
  }

  console.log("Seeding completed successfully with fresh dates.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
