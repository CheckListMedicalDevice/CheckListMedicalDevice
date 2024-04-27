import { IFireTransectionStatusActive } from "../interfaces/fire_transection.interface";

export default function getStatusDescription(
    statusCode: IFireTransectionStatusActive
  ): string {
    switch (statusCode) {
      case IFireTransectionStatusActive.EMPTY:
        return "EMPTY";
      case IFireTransectionStatusActive.INACTIVE:
        return "INACTIVE";
      case IFireTransectionStatusActive.ACTIVE:
        return "ACTIVE";
      default:
        return "UNKNOWN";
    }
  }