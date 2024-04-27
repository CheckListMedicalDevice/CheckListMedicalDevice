import { Request, Response, NextFunction } from "express";

export interface IDeviceSection {
    id: number;
    deviceId: string;
    sectionName: string;
    ability: string;
    status: string;
    createAt: Date;
    updateAt: Date;
}

export enum IDeviceSectionStatus   {
    EMPTY = 0,
    INACTIVE = 1,
    ACTIVE = 2, 
  } 

export interface RequestAndDevice extends Request {
    device?: IDeviceSection;
}

export interface ResponseAndDevice extends Response {
    device?: IDeviceSection;
}

export interface NextFunctionAndDevice extends NextFunction {
    device?: IDeviceSection;
} 