import { NextFunction, Request, Response } from "express";

export interface IFire {
    id: number;
    code: string;
    location: string;
    actor: string;
    createAt: Date;
    updateAt: Date;
    note: string;
}

export interface RequestAndFire extends Request {
    fire?: IFire;
  }
  
  export interface ResponseAndFire extends Response {
    fire?: IFire;
  }
  
  export interface NextFunctionAndFire extends NextFunction {
    fire?: IFire;
  }