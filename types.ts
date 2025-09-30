
export interface Student {
  id: string;
  name: string;
  matricNumber: string;
  department: string;
  roomNumber: string;
  photoUrl: string;
}

export enum LogType {
  ENTRY = 'Entry',
  EXIT = 'Exit',
}

export interface LogEntry {
  studentId: string;
  studentName: string;
  matricNumber: string;
  type: LogType;
  timestamp: Date;
}
