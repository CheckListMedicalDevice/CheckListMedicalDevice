

export interface IFireTransection {
    id: number;
    code: string;
    location: string;
    note: string;
    
    createdAt: string;
    updateAt: Date;
    status: IFireTransectionStatus;
    statusActive: IFireTransectionStatusActive;
}


export enum IFireTransectionStatusActive   {
  EMPTY = 0,
  INACTIVE = 1,
  ACTIVE = 2,
} 

export enum IFireTransectionStatus   {
  WAITING = 0,
  SUCESSFUL = 1,
}




// export interface RequestAndFire extends Request {
//     fire?: IFireTransection;
//   }
  
//   export interface ResponseAndFire extends Response {
//     fire?: IFireTransection;
//   }
  
//   export interface NextFunctionAndFire extends NextFunction {
//     fire?: IFireTransection;
//   }