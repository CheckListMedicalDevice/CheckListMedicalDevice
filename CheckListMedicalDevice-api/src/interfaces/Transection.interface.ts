import { NextFunction } from "express";

export interface ITransection {
    id: number;
    deviceId: number;
    name: string;
    machineType: string;
    location: string;
    code: string;
    actor: string;
    note: string;
    status: TransactionStatus;
    createAt: Date;
    updateAt: Date;


}

export enum TransactionStatus {
    Pending = 0,
    successful = 1,
    failed = 2
    // Cancelled = 3
}

export interface RequestAndTransection extends Request {
    transection?: ITransection;
    params: {
      id: number;
    };
  }
  
  export interface ResponseAndTransection extends Response {
    transection?: ITransection;
  }
  
  export interface NextFunctionAndTransection extends NextFunction {
    transection?: ITransection;
  }
  
//   export enum roleAdmin {
//     admin = "admin",
//     user = "user",
//   }
  