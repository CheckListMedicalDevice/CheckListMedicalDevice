import { Model, Op } from "sequelize";
import { Response } from "express";
import { DeviceSection } from "../models/devicesection.model";
import { IDeviceSection } from "../interfaces/devicesection.interface";
import { Device } from "../models/device.model";
import { IDeviceTransection, RequestAndDevice } from "../interfaces/device_transection";
import { DeviceTransection } from "../models/device_transection.model";
import { IDevice } from "../interfaces/device.interface";
import { DeviceSectionTransection } from "../models/devicesection_transection.model";
import { IDeviceSectionTransection } from "../interfaces/devicesection_transection.interface";

async function generateDeviceTransections() {
  try {
    const findDevices: Model<IDeviceTransection>[] = await Device.findAll();
    if (findDevices.length === 0) {
      throw new Error("No devices found.");
    }

    const DeviceTransectionPromises = findDevices.map(async (device) => {
      try {
        const Devicebill = await DeviceTransection.create({
          name: device.dataValues.name,
          machineType: device.dataValues.machineType, 
          location: device.dataValues.location,
          code: device.dataValues.code,
          status: device.dataValues.status,
          statusActive: device.dataValues.statusActive,
        });
       

        if (!Devicebill) {
          throw new Error("Error creating bill.");
        }

        const findDeviceSections = await DeviceSection.findAll({
          where: {
            deviceId: device.dataValues.id,
          },
        });

        const DeviceSectionTransectionPromises = findDeviceSections.map(async (deviceSection) =>
          await DeviceSectionTransection.create({
            sectionName: deviceSection.dataValues.sectionName,
            deviceId: deviceSection.dataValues.deviceId,
            ability: deviceSection.dataValues.ability,
            status: deviceSection.dataValues.status,
            statusActive: deviceSection.dataValues.statusActive,
          })
        );

        await Promise.all(DeviceSectionTransectionPromises);
      } catch (error: any) {
        throw new Error(`Error creating bill for device ${device.dataValues.id}: ${error.message}`);
      }
    });

    await Promise.all(DeviceTransectionPromises);
    console.log("Bills generated successfully for all devices.");
  } catch (error) {
    console.error("Error generating device transactions:", error);
  }
}

const getDeviceBillsByAdmin = async (req: RequestAndDevice, res: Response) => {
  try {
    const { date } = req.query;
    const deviceId = req.device;

    const deviceSectionsCount: number = await DeviceSection.count({
      where: { deviceId },
    });

    const findBillsByDevice: Model<IDeviceSection>[] | null = await DeviceSection.findAll({
      where: {
        deviceId,
        createdAt: date ? date : { [Op.ne]: null },
      },
      order: [["createdAt", "DESC"]],
      limit: deviceSectionsCount,
    });

    return res.status(200).json(findBillsByDevice);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getBillsDevice = async (req: RequestAndDevice, res: Response) => {
  try {
    const allDeviceTransections: Model<IDeviceSectionTransection>[] = await DeviceSectionTransection.findAll();

    return res.status(200).json({
      total: allDeviceTransections.length,
      items: allDeviceTransections,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve device data" });
  }
};

const updateDeviceTransection = async (req: RequestAndDevice, res: Response) => {
  try {
    const { id } = req.params;
    const { deviceId, sectionName, ability, statusActive, status } = req.body;
    const updateDeviceSection: [number, Model<IDeviceTransection>[]] = await DeviceSectionTransection.update(
      {
        deviceId,
        sectionName,
        ability,
        statusActive,
        status,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    if (updateDeviceSection[0] === 0) {
      return res.status(404).json({ message: "Device transection not found" });
    }

    return res.status(200).json({ message: "Update success", data: updateDeviceSection[1][0] });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  generateDeviceTransections,
  getDeviceBillsByAdmin,
  getBillsDevice,
  updateDeviceTransection,
};