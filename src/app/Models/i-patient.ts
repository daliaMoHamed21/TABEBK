import { Gender } from "../Enums/Gender";
import { Status } from "../Enums/Status";

export interface IPatient {
  id:number | null;
  name: string | null;
  email: string | null;
  phone : number | null;
  dob: Date | null;
  gender: Gender | null;
  status: Status | null;
}
