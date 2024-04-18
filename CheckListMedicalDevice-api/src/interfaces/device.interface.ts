import { Request, Response, NextFunction } from "express";

export interface IDevice {
    id: number;
    name: string;
    machineType: string;
    location: string;
    code: string;
    actor: string;
    note: string;
    createAt: Date;
    updateAt: Date;
}

export interface RequestAndDevice extends Request {
    device?: IDevice;
}

export interface ResponseAndDevice extends Response {
    device?: IDevice;
}

export interface NextFunctionAndDevice extends NextFunction {
    device?: IDevice;
} 