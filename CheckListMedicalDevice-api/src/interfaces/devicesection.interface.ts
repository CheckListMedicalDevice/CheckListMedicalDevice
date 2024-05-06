import { Request, Response, NextFunction } from "express";

export interface IDeviceSection {
    id: number;
    deviceId: number;
    sectionName: string;
    ability: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum IDeviceSectionStatus   {
    EMPTY = 0,
    INACTIVE = 1,
    ACTIVE = 2, 
  } 

export interface RequestAndDeviceSection extends Request {
    deviceSection?: IDeviceSection;
}

export interface ResponseAndDeviceSection extends Response {
    deviceSection?: IDeviceSection;
}

export interface NextFunctionAndDeviceSection extends NextFunction {
    deviceSection?: IDeviceSection;
} 