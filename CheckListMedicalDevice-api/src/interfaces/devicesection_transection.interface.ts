import { Request, Response, NextFunction } from "express";


export interface IDeviceSectionTransection {
    id: number;
    deviceId: number;
    sectionName: string;
    ability: string;
    status: IDeviceSectionTransectionStatus;
    statusActive: IDeviceSectionTransectionStatusActive;
    createAt: Date;
    updateAt: Date;
}





export enum IDeviceSectionTransectionStatusActive   {
    EMPTY = 0,
    INACTIVE = 1,
    ACTIVE = 2,
  } 
  
  export enum IDeviceSectionTransectionStatus   {
    WAITING = 0,
    SUCCESSFUL  = 1,
  }

  export interface RequestAndDevice extends Request {
    device?: IDeviceSectionTransection;
}

export interface ResponseAndDevice extends Response {
    device?: IDeviceSectionTransection;
}

export interface NextFunctionAndDevice extends NextFunction {
    device?: IDeviceSectionTransection;
} 