
import React from 'react';
import { Student, LogEntry, LogType } from '../types';

interface StudentInfoProps {
  student: Student | null;
  lastLog: LogEntry | null;
  onLogAction: (type: LogType) => void;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ student, lastLog, onLogAction }) => {
  if (!student) {
    return (
      <div className="bg-brand-blue/30 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center h-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-lightblue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
        </svg>
        <h3 className="text-xl font-semibold text-brand-white">Scan a Student ID</h3>
        <p className="text-brand-lightblue">Student details will appear here once a valid QR code is scanned.</p>
      </div>
    );
  }

  const nextAction = lastLog?.type === LogType.ENTRY ? LogType.EXIT : LogType.ENTRY;

  return (
    <div className="bg-brand-blue/30 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center text-center">
        <img
          src={student.photoUrl}
          alt={student.name}
          className="w-32 h-32 rounded-full border-4 border-brand-lightblue object-cover mb-4"
        />
        <h2 className="text-2xl font-bold text-white">{student.name}</h2>
        <p className="text-brand-lightblue">{student.matricNumber}</p>
      </div>
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-300">Department:</span>
          <span className="text-gray-100">{student.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-300">Room No:</span>
          <span className="text-gray-100">{student.roomNumber}</span>
        </div>
        <hr className="border-gray-600 my-4" />
        <div className="flex justify-between">
          <span className="font-semibold text-gray-300">Last Action:</span>
          {lastLog ? (
            <span className={`font-bold ${lastLog.type === LogType.ENTRY ? 'text-green-400' : 'text-yellow-400'}`}>
              {lastLog.type} @ {lastLog.timestamp.toLocaleTimeString()}
            </span>
          ) : (
            <span className="text-gray-400">No recent activity</span>
          )}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          onClick={() => onLogAction(LogType.ENTRY)}
          disabled={lastLog?.type === LogType.ENTRY}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          Log Entry
        </button>
        <button
          onClick={() => onLogAction(LogType.EXIT)}
          disabled={lastLog?.type !== LogType.ENTRY}
          className="w-full bg-brand-red hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          Log Exit
        </button>
      </div>
    </div>
  );
};


export default StudentInfo;
