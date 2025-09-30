
import React, { useState, useCallback } from 'react';
import { Student, LogEntry, LogType } from './types';
import { STUDENTS_DATA } from './constants';
import Scanner from './components/Scanner';
import StudentInfo from './components/StudentInfo';
import LogTable from './components/LogTable';

const Header: React.FC = () => (
  <header className="bg-brand-blue shadow-lg">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-brand-white tracking-wider">
        FPU Female Hostel - Student Tracker
      </h1>
      <img src="https://federalpolytechnicukana.edu.ng/wp-content/uploads/2023/12/fpu-logo.png" alt="FPU Logo" className="h-12 bg-white p-1 rounded-full"/>
    </div>
  </header>
);

const App: React.FC = () => {
  const [scannedStudent, setScannedStudent] = useState<Student | null>(null);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [lastLogForScannedStudent, setLastLogForScannedStudent] = useState<LogEntry | null>(null);

  const handleScan = useCallback((data: string | null) => {
    if (!data) return;

    const student = STUDENTS_DATA.find(s => s.id === data);
    if (student) {
      setScannedStudent(student);
      const lastLog = logEntries.find(entry => entry.studentId === student.id) || null;
      setLastLogForScannedStudent(lastLog);
    } else {
      alert("Student QR Code not recognized.");
      setScannedStudent(null);
      setLastLogForScannedStudent(null);
    }
  }, [logEntries]);

  const logAction = (type: LogType) => {
    if (!scannedStudent) return;

    const newLog: LogEntry = {
      studentId: scannedStudent.id,
      studentName: scannedStudent.name,
      matricNumber: scannedStudent.matricNumber,
      type: type,
      timestamp: new Date(),
    };

    setLogEntries(prevLogs => [newLog, ...prevLogs]);
    setScannedStudent(null); 
    setLastLogForScannedStudent(null);
  };

  return (
    <div className="min-h-screen bg-brand-gray">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Scanner onScan={handleScan} />
            <StudentInfo student={scannedStudent} lastLog={lastLogForScannedStudent} onLogAction={logAction} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3">
            <LogTable logEntries={logEntries} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
