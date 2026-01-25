import Image from "next/image";
import AttendenceChart from "./AttendenceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);

  lastMonday.setDate(today.getDate() - daysSinceMonday);

  // Set lastMonday to start of day (00:00:00)
  lastMonday.setHours(0, 0, 0, 0);

  // Set end of week (Friday 23:59:59)
  const lastFriday = new Date(lastMonday);
  lastFriday.setDate(lastMonday.getDate() + 4);
  lastFriday.setHours(23, 59, 59, 999);

  // First, check if there's ANY attendance data in the database
  const allAttendance = await prisma.attendance.findMany({
    take: 5,
    orderBy: { date: 'desc' },
    select: {
      date: true,
      present: true,
    },
  });

  console.log("=== ATTENDANCE CHART DEBUG ===");
  console.log("Today:", today.toISOString());
  console.log("Today's day of week (0=Sun, 1=Mon, etc.):", dayOfWeek);
  console.log("Days since Monday:", daysSinceMonday);
  console.log("Last Monday (start of week):", lastMonday.toISOString());
  console.log("Last Friday (end of week):", lastFriday.toISOString());
  console.log("\n--- Checking database for attendance records ---");
  console.log("Sample of ALL attendance records (last 5):", JSON.stringify(allAttendance, null, 2));

  // Query with date range - using start of day for both to ensure we catch all records
  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
        lte: lastFriday,
      },
    },
    select: {
      date: true,
      present: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  // Also try querying without time constraints to see all records
  const allRecordsThisWeek = await prisma.attendance.findMany({
    select: {
      date: true,
      present: true,
    },
    orderBy: {
      date: 'desc',
    },
    take: 20, // Get last 20 records to see what dates exist
  });

  // console.log("\n--- Query results for current week ---");
  // console.log("Attendance records found in week range:", resData.length);
  // console.log("Raw attendance data from DB:", JSON.stringify(resData, null, 2));

  // If no data found, try a wider range (last 7 days) to see if there's any data
  if (resData.length === 0) {
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const last7DaysData = await prisma.attendance.findMany({
      where: {
        date: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        date: true,
        present: true,
      },
    });
    // console.log("\n--- Checking last 7 days (wider range) ---");
    // console.log("Records found in last 7 days:", last7DaysData.length);
    // console.log("Sample data:", JSON.stringify(last7DaysData.slice(0, 5), null, 2));
  }

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Create a map for each day of the week (Monday = 0, Tuesday = 1, etc.)
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
  {
    Mon: { present: 0, absent: 0 },
    Tue: { present: 0, absent: 0 },
    Wed: { present: 0, absent: 0 },
    Thu: { present: 0, absent: 0 },
    Fri: { present: 0, absent: 0 },
  };

  console.log("\n--- Processing attendance records ---");
  resData.forEach((item, index) => {
    const itemDate = new Date(item.date);
    // Normalize the date to start of day for comparison
    const itemDateNormalized = new Date(itemDate);
    itemDateNormalized.setHours(0, 0, 0, 0);

    // Verify the date is within our week range
    if (itemDateNormalized < lastMonday || itemDateNormalized > lastFriday) {
      console.log(`Record ${index + 1}: SKIPPED - Date ${itemDateNormalized.toISOString()} is outside week range`);
      return;
    }

    const dayOfWeek = itemDateNormalized.getDay();

    // Calculate which day of the week this is (Monday = 0, Friday = 4)
    // JavaScript: Sunday = 0, Monday = 1, ..., Saturday = 6
    // We want: Monday = 0, Tuesday = 1, ..., Friday = 4
    const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert Sunday (0) to 6, then subtract 1 for Monday = 0

    console.log(`Record ${index + 1}:`, {
      date: itemDateNormalized.toISOString(),
      dayOfWeek: dayOfWeek,
      dayIndex: dayIndex,
      dayName: dayIndex >= 0 && dayIndex <= 4 ? daysOfWeek[dayIndex] : 'Weekend',
      present: item.present,
      isInRange: itemDateNormalized >= lastMonday && itemDateNormalized <= lastFriday
    });

    // Only process weekdays (Monday = 0, Friday = 4)
    if (dayIndex >= 0 && dayIndex <= 4) {
      const dayName = daysOfWeek[dayIndex];

      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    } else {
      console.log(`Record ${index + 1}: SKIPPED - Weekend day (${dayOfWeek})`);
    }
  });

  // console.log("\n--- Attendance map after processing ---");
  // console.log(JSON.stringify(attendanceMap, null, 2));

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  // console.log("\n--- Final chart data ---");
  // console.log(JSON.stringify(data, null, 2));
  // console.log("=== END DEBUG ===\n");

  return (
    <div className="bg-white rounded-lg p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendenceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;