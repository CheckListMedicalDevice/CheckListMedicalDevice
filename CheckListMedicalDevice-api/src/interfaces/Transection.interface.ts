import { Request, Response, NextFunction } from "express";

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
    Successful = 1,
    Failed = 2
    // Cancelled = 3
}

export interface RequestAndTransection extends Request {
    transection?: ITransection;
}

export interface ResponseAndTransection extends Response {
    transection?: ITransection;
}

export interface NextFunctionAndTransection extends NextFunction {
    transection?: ITransection;
}
