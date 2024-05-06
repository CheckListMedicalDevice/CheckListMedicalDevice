export interface IDeviceTransection {
    id: number;
    deviceId: number;
    sectionName: string;
    ability: string;
    status: IDeviceTransectionStatus;
    statusActive: IDeviceStatusActive;
    createdAt: Date;
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