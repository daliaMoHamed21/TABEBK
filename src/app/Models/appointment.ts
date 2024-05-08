import { AppStatus } from "../Enums/AppStatus";

export interface IAppointment {
  id: number | undefined ;
  date: string;
  order: number;
  status: AppStatus;
  createdDate: string;
  doctorID: number;
  patientID: number;
}
