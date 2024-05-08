import { IAppointment } from "./appointment";
import { IDoctor } from "./i-doctor";

export interface ISingleDocAppointment {
  doctor:IDoctor,
  appointement: IAppointment,
}
