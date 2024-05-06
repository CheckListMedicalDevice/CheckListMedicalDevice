import { IDeviceStatusActive } from "../interfaces/device_transection.interface";

  export default function getStatusDescriptionDevice(
    statusCode: IDeviceStatusActive
  ): string {
    switch (statusCode) {
      case IDeviceStatusActive.EMPTY:
        return "EMPTY";
      case IDeviceStatusActive.INACTIVE:
        return "INACTIVE";
      case IDeviceStatusActive.ACTIVE:
        return "ACTIVE";
      default:
        return "UNKNOWN";
    }
  }