# SchoolSync - School Management Website

A comprehensive, modern school management system designed to streamline administrative tasks, improve communication, and enhance educational outcomes through a centralized digital platform.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [User Roles](#user-roles)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)

---

## 🎯 Overview

**SchoolSync** is a full-featured school management system that connects administrators, teachers, students, and parents on a single platform. It automates attendance tracking, grade management, class scheduling, and communication—reducing administrative burden and improving visibility across the school ecosystem.

### What It Does:
- **Administrative Management**: Create and manage teachers, students, classes, subjects, and grades
- **Academic Tracking**: Monitor attendance, exams, assignments, and student results
- **Schedule Management**: Organize lessons, exams, and events across the academic calendar
- **Communication Hub**: Broadcast announcements and manage notifications
- **Analytics & Reports**: Visualize attendance trends, student performance, and financial data through interactive charts
- **Role-Based Access**: Secure, differentiated access for admins, teachers, students, and parents

---

## ✨ Key Features

### 👨‍💼 **For Administrators**
- Manage complete teacher and student database
- Create and organize classes, grades, and subjects
- Configure lesson schedules and exams
- Track school finances and generate reports
- View comprehensive analytics and dashboards
- Manage school announcements and events

### 👨‍🏫 **For Teachers**
- View assigned classes and lesson schedules
- Record student attendance
- Create and manage assignments
- Input exam results and grades
- Access student performance analytics
- Communicate through announcements

### 👨‍🎓 **For Students**
- View personal schedule and class information
- Track exam dates and assignment deadlines
- Monitor personal grades and results
- View attendance records
- Access school announcements and events

### 👨‍👩‍👧‍👦 **For Parents**
- Monitor child's attendance and performance
- Track grades and exam results
- Receive school announcements
- View academic calendar and events

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Charts & Visualization**: Recharts
- **Form Management**: React Hook Form + Zod validation
- **UI Components**: Custom components with Image optimization
- **Authentication**: Clerk (next-gen auth platform)

### Backend
- **Runtime**: Node.js
- **API**: Next.js Server Actions
- **ORM**: Prisma 7
- **Database**: PostgreSQL
- **Database Adapter**: PrismaPg (optimized for PostgreSQL)

### Infrastructure & Tools
- **Version Control**: Git + GitHub
- **Build Tool**: Next.js built-in
- **Package Manager**: npm
- **Environment Management**: dotenv

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Client (Next.js/React)          │
│  - Dashboard, Forms, Analytics          │
│  - Role-based UI rendering              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    Next.js Server Actions & API         │
│  - User authentication (Clerk)          │
│  - Data validation & business logic     │
│  - Cache revalidation                   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Prisma ORM + PostgreSQL            │
│  - Data models & relationships          │
│  - Migrations & schema management       │
│  - Cascade deletes & integrity          │
└─────────────────────────────────────────┘
```

---

## 👥 User Roles

| Role | Permissions | Access Level |
|------|-----------|---|
| **Admin** | Full system access, manage all records, view analytics | Complete |
| **Teacher** | Create assignments, record attendance, input grades, view classes | Classroom |
| **Student** | View schedule, grades, attendance, announcements | Personal |
| **Parent** | Monitor child's academic progress, view announcements | Child-specific |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database
- Clerk account for authentication

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Anu8hav/School-Management-Website.git
cd School-Management-Website
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/schooldb"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

4. **Run database migrations**
```bash
npx prisma migrate dev
```

5. **Seed the database** (optional - adds sample data)
```bash
npx prisma db seed
```

6. **Start the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup

### PostgreSQL Installation
```bash
# Install PostgreSQL (Windows/macOS/Linux)
# Or use Docker:
docker run --name schooldb -e POSTGRES_PASSWORD=password -d postgres
```

### Connection
Update `DATABASE_URL` in `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/school_db"
```

### Migrations
```bash
# Create new migration
npx prisma migrate dev --name your_migration_name

# Deploy migrations
npx prisma migrate deploy

# View database in Prisma Studio
npx prisma studio
```

---

## 📁 Project Structure

```
School-Management-Website/
├── src/
│   ├── app/                 # Next.js pages & layouts
│   │   ├── (dashboard)/     # Main dashboard routes
│   │   ├── [[...sign-in]]/  # Authentication pages
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── forms/           # Form components for CRUD
│   │   ├── Menu.tsx         # Navigation menu
│   │   ├── Navbar.tsx       # Header navigation
│   │   └── charts/          # Analytics & visualization
│   ├── lib/                 # Utilities & server actions
│   │   ├── actions.ts       # Server-side business logic
│   │   ├── prisma.ts        # Prisma client setup
│   │   └── formValidationSchemas.ts
│   └── middleware.ts        # Authentication middleware
├── prisma/
│   ├── schema.prisma        # Database schema & models
│   ├── seed.ts              # Sample data seeding
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS config
└── README.md
```

---

## 🗄️ Key Database Models

| Model | Purpose |
|-------|---------|
| **Admin** | System administrators with full access |
| **Teacher** | Faculty members managing classes and grades |
| **Student** | Learners with enrollment and performance tracking |
| **Parent** | Guardians monitoring student progress |
| **Class** | Academic groups with capacity and supervisor |
| **Subject** | Courses taught by teachers |
| **Lesson** | Scheduled classes with time and location |
| **Exam** | Assessments with results |
| **Assignment** | Homework with due dates |
| **Attendance** | Daily presence tracking per student-lesson |
| **Result** | Scores for exams and assignments |
| **Event** | School events and activities |
| **Announcement** | School-wide notifications |

---

## 🔐 Security Features

- **Role-Based Access Control (RBAC)**: Secure routes based on user roles
- **Clerk Authentication**: Industry-standard user authentication
- **Data Validation**: Zod schema validation on all forms
- **Database Constraints**: Cascading deletes and foreign key integrity
- **Environment Variables**: Sensitive data protected with dotenv
- **Server Actions**: Type-safe server-side operations

---

## ✅ Features Implemented

- ✅ Complete CRUD operations for all entities
- ✅ Attendance tracking with 7-day history
- ✅ Grade management and result tracking
- ✅ Real-time dashboard with interactive charts
- ✅ Role-based access control (Admin, Teacher, Student, Parent)
- ✅ Responsive UI for desktop and mobile
- ✅ Form validation with Zod schemas
- ✅ Database seeding with realistic time-relevant data
- ✅ Attendance analytics and visualization
- ✅ Student performance tracking
- ✅ Event and announcement management
- ✅ Lesson and exam scheduling

---

## 🔧 Recent Fixes & Improvements (v1.0)

- ✅ Fixed Prisma configuration and PostgreSQL adapter setup
- ✅ Corrected delete operations with CASCADE rules
- ✅ Improved form submission using proper server actions
- ✅ Resolved TypeScript compilation errors
- ✅ Optimized seed data with 2,100+ time-relevant records
- ✅ Enhanced error handling and user feedback with toast notifications
- ✅ Removed blocking validation on deletes for better UX
- ✅ Fixed Clerk user creation with proper error handling

---

## 📊 Dashboard Capabilities

### Admin Dashboard
- Student and teacher enrollment statistics
- Attendance trends (7-day analytics)
- Class capacity overview
- Finance monitoring
- Upcoming exams and assignments
- Recent announcements

### Teacher Dashboard
- Class schedule
- Student attendance records
- Assignment submissions
- Grade entry interface
- Class performance analytics

### Student Dashboard
- Personal schedule
- Grade and result tracking
- Assignment deadlines
- Attendance record
- School announcements

### Parent Dashboard
- Child's attendance summary
- Academic performance
- Grade history
- Upcoming events
- School announcements

---

## 🚧 Future Enhancements

- [ ] Payment/Fee management module
- [ ] SMS and email notifications
- [ ] Parent-teacher communication portal
- [ ] Mobile app (React Native)
- [ ] Advanced reporting and export features
- [ ] Bulk student/teacher import
- [ ] Online exam system
- [ ] Student progress prediction with AI

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Anu8hav**  
GitHub: [@Anu8hav](https://github.com/Anu8hav)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

---

## 📞 Support

For issues, bugs, or feature requests, please create an issue on [GitHub Issues](https://github.com/Anu8hav/School-Management-Website/issues).

---

## 🎯 Project Status

✅ **PRODUCTION READY** - All core features implemented and tested
