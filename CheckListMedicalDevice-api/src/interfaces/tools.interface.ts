import { NextFunction, Request ,Response } from "express";

export interface ITools {
    id: number;
    name: string;
    note: string;
    count: number;

}

export interface RequsetAndTools extends Request {
    tools?: ITools;
}

export interface ResponseAndTools extends Response {
    tools?: ITools;
}

export interface NextFunctionAndTools extends NextFunction {
    tools?: ITools;
}