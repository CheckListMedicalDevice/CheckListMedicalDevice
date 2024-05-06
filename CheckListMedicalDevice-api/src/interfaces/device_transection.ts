import { Request, Response, NextFunction } from "express";


export interface IDeviceTransection {
    id: number;
    name: string;
    machineType: string;
    location: string;
    code: string;
    status: IDeviceTransectionStatus;
    statusActive: IDeviceStatusActive;
    createAt: Date;
    updateAt: Date;
}





export enum IDeviceStatusActive   {
    EMPTY = 0,
    INACTIVE = 1,
    ACTIVE = 2,
  } 
  
  export enum IDeviceTransectionStatus   {
    WAITING = 0,
    SUCCESSFUL  = 1,
  }

  export interface RequestAndDevice extends Request {
    device?: IDeviceTransection;
}

export interface ResponseAndDevice extends Response {
    device?: IDeviceTransection;
}

export interface NextFunctionAndDevice extends NextFunction {
    device?: IDeviceTransection;
} 