import Announcements from "@/components/Announcements";
import AttendenceChart from "@/components/AttendenceChart";
import CountChart from "@/components/CountChart";
import EventCalender from "@/components/EventCalender";
import FinanceChart from "@/components/FinanceChart";
import Finance from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";


const AdminPage = () => {
  return (
      <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>


        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450]">
          <CountChart/> 
          </div>
          
          {/* ATTENDENCE CHART */}
          <div className="w-full lg:w-2/3 h-[450]"><AttendenceChart/></div>


        </div>


        {/* BOTTOM CHARTS */}
        <div className="">
          <FinanceChart/>
        </div>
        </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/3 flex flex-col gap-8">
        <EventCalender/>
        <Announcements/>
      </div>
    </div>
  );
};

export default AdminPage;
