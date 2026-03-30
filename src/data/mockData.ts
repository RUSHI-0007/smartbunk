export interface Subject {
  id: string;
  name: string;
  code: string;
  type: string;
  attended: number;
  total: number;
}

export interface Assignment {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  status: 'Pending' | 'Completed';
  urgency?: 'high' | 'medium' | 'low';
}

export interface AbsenceRequest {
  id: string;
  subject: string;
  date: string;
  reasonType: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface StudentProfile {
  name: string;
  semester: number;
  branch: string;
  university: string;
  overallAttendance: number;
  subjects: Subject[];
  assignments: Assignment[];
  absenceHistory: AbsenceRequest[];
}

export const studentData: StudentProfile = {
  name: "Rushi",
  semester: 4,
  branch: "Computer Engineering",
  university: "SPPU",
  overallAttendance: 81,
  subjects: [
    {
      id: "cs401",
      name: "Database Management",
      code: "CS401",
      type: "THEORY",
      attended: 35,
      total: 40
    },
    {
      id: "cs402",
      name: "Discrete Mathematics",
      code: "CS402",
      type: "THEORY",
      attended: 26,
      total: 38
    },
    {
      id: "cs403",
      name: "Computer Organization",
      code: "CS403",
      type: "THEORY",
      attended: 29,
      total: 42
    },
    {
      id: "cs404",
      name: "Web Development Lab",
      code: "CS404",
      type: "PRACTICAL",
      attended: 18,
      total: 20
    },
    {
      id: "cs405",
      name: "Data Structures / Algo",
      code: "CS405",
      type: "THEORY",
      attended: 32,
      total: 40
    },
    {
      id: "cs406",
      name: "Internet of Things",
      code: "CS406",
      type: "THEORY",
      attended: 24,
      total: 33
    }
  ],
  assignments: [
    {
      id: "a1",
      subjectCode: "CS401",
      subjectName: "DBMS",
      title: "SQL Complex Queries Lab",
      description: "Complete 15 queries from Lab Manual Part B involving Joins and Subqueries.",
      tags: ["DBMS", "SQL"],
      dueDate: "Due in 2 days",
      status: "Pending",
      urgency: "medium"
    },
    {
      id: "a2",
      subjectCode: "CS405",
      subjectName: "Data Structures",
      title: "Graph Algorithms in Java",
      description: "Implement Dijkstra's algorithm. Ensure output matches all test cases in the manual.",
      tags: ["Java", "DSA"],
      dueDate: "Due Tomorrow",
      status: "Pending",
      urgency: "high"
    },
    {
      id: "a3",
      subjectCode: "CS404",
      subjectName: "JavaScript",
      title: "Web Dev UI Clone",
      description: "",
      tags: [],
      dueDate: "",
      status: "Completed"
    },
    {
      id: "a4",
      subjectCode: "CS402",
      subjectName: "Theory",
      title: "Discrete Math Theory",
      description: "",
      tags: [],
      dueDate: "",
      status: "Completed"
    }
  ],
  absenceHistory: [
    {
      id: "req1",
      subject: "Computer Organization & Microprocessor",
      date: "Feb 5, 2026",
      reasonType: "Medical",
      status: "Approved"
    },
    {
      id: "req2",
      subject: "Discrete Mathematics",
      date: "Jan 28, 2026",
      reasonType: "Family Emergency",
      status: "Approved"
    },
    {
      id: "req3",
      subject: "Internet of Things",
      date: "Jan 15, 2026",
      reasonType: "Personal",
      status: "Pending"
    },
    {
      id: "req4",
      subject: "DMS Laboratory",
      date: "Dec 20, 2025",
      reasonType: "Other",
      status: "Rejected"
    }
  ]
};

export const facultyData = {
  name: "Dr. R. Patil",
  todayClasses: [
    { id: 1, subj: "Computer Organization", code: "CS403", time: "9:00 – 10:00 AM", room: "Room 301", students: 48 },
    { id: 2, subj: "Database Management", code: "CS401", time: "11:00 – 12:00 PM", room: "Room 205", students: 52 }
  ],
  defaulters: [
    { name: "Rahul Verma", roll: "2022/CS/041", subj: "CS403", pct: 58 },
    { name: "Aisha Khan", roll: "2022/CS/017", subj: "CS406", pct: 62 },
    { name: "Meera Nair", roll: "2022/CS/058", subj: "CS403", pct: 64 },
    { name: "Rushi", roll: "2022/CS/001", subj: "CS402", pct: 68 }
  ]
};
