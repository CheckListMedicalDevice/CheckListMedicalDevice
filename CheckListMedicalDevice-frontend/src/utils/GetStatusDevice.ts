import { IDeviceTransectionStatus } from "../interfaces/device_transection.interface";


export default function getStatusDevice(status: IDeviceTransectionStatus): string {
    switch (status) {
      case IDeviceTransectionStatus.WAITING:
        return "WAITING";
      case IDeviceTransectionStatus.SUCCESSFUL:
        return "SUCCESSFUL";

      default:
        return "UNKNOWN";
    }
  }