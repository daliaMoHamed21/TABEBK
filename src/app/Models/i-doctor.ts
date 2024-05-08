import { Gender } from "../Enums/Gender";
import { Status } from "../Enums/Status";

export interface IDoctor {
[x: string]: any;
  id:number,
  name : string,
  email : string,
  governance : string,
  address : string,
  nationalID : string,
  phone : string,
  description?:string,
  gender : Gender,
  dob : Date,
  appointmentPrice : number,
  status : Status,
  picPath?:string,
  specialityID : string,
}

// "Invalid column name 'Description'.
// Invalid column name 'PicPath'."