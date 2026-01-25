import Announcements from "@/components/Announcements";
import AttendenceChartContainer from "@/components/AttendenceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalenderContainer";
import EventCalender from "@/components/EventCalenderContainer";
import FinanceChart from "@/components/FinanceChart";
import Finance from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import { redirect } from "next/navigation";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

  if (!searchParams.date) {
    const today = new Date().toISOString().split("T")[0];
    redirect(`/admin?date=${today}`);
  }
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>

          {/* ATTENDENCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendenceChartContainer />
          </div>
        </div>

        {/* BOTTOM CHARTS */}
        <div className="">
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams}/>
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
