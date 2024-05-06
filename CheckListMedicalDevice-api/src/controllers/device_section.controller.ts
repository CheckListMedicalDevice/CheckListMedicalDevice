import { Request, Response } from "express";
import dotenv from "dotenv";

import { Device } from "../models/device.model";
import { Model } from "sequelize";
import {
  IDeviceSection,
  RequestAndDeviceSection,
} from "../interfaces/devicesection.interface";
import { DeviceSection } from "../models/devicesection.model";

dotenv.config();

const createDeviceSection = async (
  req: RequestAndDeviceSection,
  res: Response
) => {
  try {
    const {
      sectionName,
      ability,
    }: {
      sectionName: string;
      ability: string;
    } = req.body;
    const { id } = req.params;

    const data = {
      deviceId: id,
      sectionName,
      ability,

      createAt: new Date(),
      updateAt: new Date(),
    };

    const deviceCreate: Model<IDeviceSection> | null =
      await DeviceSection.create({
        ...data,
      });
    if (!deviceCreate) {
      return res.status(404).json({ message: "Fail to Create" });
    }
    return res.status(201).json({ message: "Create Device success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong can't create " });
  }
};

const updateDeviceSection = async (
  req: RequestAndDeviceSection,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { deviceId, sectionName, ability } = req.body;
    const updateDeviceSection: any = await DeviceSection.update(
      {
        deviceId,
        sectionName,
        ability,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({ mesage: "Update Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve DeviceSection " });
  }
};

const getDeviceSection = async (
  req: RequestAndDeviceSection,
  res: Response
) => {
  try {
    const alldeviceSections: Model<IDeviceSection>[] =
      await DeviceSection.findAll({ where: { deviceId: req.params.deviceId } });

    return res.status(200).json({
      total: alldeviceSections.length,
      items: alldeviceSections,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve DeviceSection",
    });
  }
};

const getDeviceSectionById = async (
  req: RequestAndDeviceSection,
  res: Response
) => {
  try {
    const { id } = req.params;
    const device: Model<IDeviceSection> | null = await DeviceSection.findByPk(
      id
    );
    if (!device) {
      return res.status(404).json({ message: "DeviceSection not found" });
    }
    return res.status(200).json(device);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve DeviceSectionById",
    });
  }
};

const deleteDeviceSection = async (
  req: RequestAndDeviceSection,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deleteDevice: any = await DeviceSection.destroy({
      where: {
        id,
      },
    });
    await deleteDevice.destroyer();
    return res.status(200).json({ message: "Delete Success" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createDeviceSection,
  updateDeviceSection,
  getDeviceSection,
  getDeviceSectionById,
  deleteDeviceSection,
};
