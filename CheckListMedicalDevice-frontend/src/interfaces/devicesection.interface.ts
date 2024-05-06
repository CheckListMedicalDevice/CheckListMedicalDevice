

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

