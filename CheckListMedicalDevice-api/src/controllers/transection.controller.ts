import { Transection } from './../models/transection.model';
import { Request, Response } from "express";
import dotenv from "dotenv";
import { Model, Op } from "sequelize";
import { ITransection, RequestAndTransection } from "../interfaces/Transection.interface";


dotenv.config();

const createTransection = async (req: Request, res: Response) => {
  try {
    const { deviceId, name, machineType, location, code, actor, note, status } =
      req.body;

    const data = {
      deviceId,
      name,
      machineType,
      location,
      code,
      actor,
      note,
      status,
    };
    const transectionCreate: Model<ITransection> | null =
      await Transection.create({
        ...data,
      });

    if (!transectionCreate) {
      return res.status(404).json({ message: "Fail to Create" });
    }
    return res.status(201).json({ message: "Transection Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTransection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const {deviceId, name, machineType, location, code, actor, note, status } = req.body
        const updateTransection: any = await Transection.update(
            {
                deviceId,
                name,
                machineType,
                location,
                code,
                actor,
                note,
                status,
            },
            {
                where: {
                    id,
                },
            }
        )
        return res.status(200).json({ message: "update success"})

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteTransection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const deleteTransection: any = await Transection.destroy(
            {
                where: {
                    id,
                },
            }
        )
        return res.status(200).json({ message: "delete success"})
}
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const getTransection = async (req: Request, res: Response) => {
    try {
        const alltransection: Model<ITransection>[] = await Transection.findAll()
        return res.status(200).json({
            total: alltransection.length,
            items: alltransection,
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const getTransectionById = async (req: RequestAndTransection, res: Response) => {
    try {
        const transection: ITransection = req.transection!;
        const {id} = req.params;
        const findTransectionById: Model<ITransection> | null = await Transection.findOne({
            where: {
                id,
            },
        });
        return res.status(200).json(findTransectionById);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong"})
    }
}

export default {
    createTransection,
    updateTransection,
    deleteTransection,
    getTransection,
    getTransectionById,
}