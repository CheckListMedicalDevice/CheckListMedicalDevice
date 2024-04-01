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

