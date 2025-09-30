
import React from 'react';
import { LogEntry, LogType } from '../types';

interface LogTableProps {
  logEntries: LogEntry[];
}

const LogTable: React.FC<LogTableProps> = ({ logEntries }) => {
  return (
    <div className="bg-brand-blue/30 p-4 rounded-lg shadow-lg h-full">
      <h3 className="text-xl font-bold text-brand-white mb-4 px-2">Activity Log</h3>
      <div className="overflow-auto max-h-[80vh]">
        {logEntries.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>No activity recorded yet.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-brand-lightblue uppercase bg-brand-gray sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-3">Student Name</th>
                <th scope="col" className="px-4 py-3">Matric No.</th>
                <th scope="col" className="px-4 py-3">Action</th>
                <th scope="col" className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {logEntries.map((entry, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-brand-gray/50">
                  <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{entry.studentName}</td>
                  <td className="px-4 py-3">{entry.matricNumber}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      entry.type === LogType.ENTRY
                        ? 'bg-green-900 text-green-300'
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">{entry.timestamp.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LogTable;
