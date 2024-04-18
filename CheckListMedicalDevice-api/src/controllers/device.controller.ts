import { Request, Response } from "express";
import dotenv from "dotenv";
import { IDevice, RequestAndDevice } from "../interfaces/device.interface";
import { Device } from "../models/device.model";
import { Model } from "sequelize";

dotenv.config();

const createDevice = async (req: Request, res: Response) => {
    try {
        const {
            name,
            machineType,
            location,
            code,
            actor,
            note,
        }: {
            name: string;
            machineType: string;
            location: string;
            code: string;
            actor: string;
            note: string;
        }= req.body;

        const data = {
            name,
            machineType,
            location,
            code,
            actor,
            note,
            createAt: new Date(),
            updateAt: new Date(),
        };
        const deviceCreate: Model<IDevice> | null = await Device.create({
            ...data,
        });
        if (!deviceCreate) {
            return res.status(404).json({ message: "Fail to Create" });
        }
        return res.status(201).json({ message: "Create Device success" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong "});
    }
};

const updateDevice = async (req: RequestAndDevice, res: Response) => {
    try {
        const { id } = req.params;
        const { name,
            machineType,
            location,
            code,
            actor,
            note,} = req.body;
            const updateDevice: any = await Device.update({
                name,
                machineType,
                location,
                code,
                actor,
                note,
            },{
                where: {
                    id,
                }
            });
            return res.status(200).json({ mesage: "Update Success"});
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve Device "})
    }
};

const getDevice = async (req: RequestAndDevice, res: Response) => {
    try {
        const alldevices: Model<IDevice>[] = await Device.findAll();

        return res.status(200).json({
            total: alldevices.length,
            items: alldevices,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve Device",
        })
    }
};

const getDeviceById = async (req: RequestAndDevice, res: Response) => {
    try {
        const { id } = req.params;
        const device: Model<IDevice> | null = await Device.findByPk(id);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        return res.status(200).json(device);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve Device",
        })
    }
}

const deleteDevice = async (req: RequestAndDevice, res: Response) => {
    try {
        const { id } = req.params;
        const deleteDevice: any = await Device.destroy({
            where: {
                id,
            }
        });
        await deleteDevice.destroyer();
        return res.status(200).json({ message: "Delete Success" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default {
    createDevice,
    updateDevice,
    getDevice,
    getDeviceById,
    deleteDevice,
}
