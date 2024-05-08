import { DocumentType } from "../Enums/DocumentType";

export interface IAddDocument {
    document: File | null,
    type: DocumentType,
    doctorID:number
}