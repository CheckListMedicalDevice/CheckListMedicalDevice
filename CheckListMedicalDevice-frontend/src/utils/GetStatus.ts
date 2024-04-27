import { IFireTransectionStatus } from "../interfaces/fire_transection.interface";

export default function getStatus(status: IFireTransectionStatus): string {
    switch (status) {
      case IFireTransectionStatus.WAITING:
        return "WAITING";
      case IFireTransectionStatus.SUCESSFUL:
        return "SUCESSFUL";

      default:
        return "UNKNOWN";
    }
  }