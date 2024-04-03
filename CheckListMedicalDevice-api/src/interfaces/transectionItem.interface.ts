
import { NextFunction } from "express";

export interface ITransectionItem {
    id: number;
    transectionId: number;
    deviceItemId: string;
    partName: string;
    ability: string;
    already: Boolean;
    createAt: Date;
    updateAt: Date;


}

// export enum TransactionStatus {
//     Pending = 0,
//     successful = 1,
//     failed = 2
//     // Cancelled = 3
// }

export interface RequestAndTransectionItem extends Request {
    transection?: ITransectionItem;
    
  }
  
  export interface ResponseAndTransectionItem  extends Response {
    transection?: ITransectionItem;
  }
  
  export interface NextFunctionAndTransectionItem  extends NextFunction {
    transection?: ITransectionItem;
  }
  
//   export enum roleAdmin {
//     admin = "admin",
//     user = "user",
//   }
  