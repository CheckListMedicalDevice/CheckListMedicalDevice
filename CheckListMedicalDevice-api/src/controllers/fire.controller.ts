import { Request, Response } from "express";
import dotenv from "dotenv";
import { IFire, RequestAndFire } from "../interfaces/fire.interface";
import { FireExtinguisher } from "../models/fire.model";
import { Model, Op } from "sequelize";

dotenv.config();

const createFireExtinguisher = async (req: Request, res: Response) => {
  try {
    const {
      code,
      location,
      actor,
    }: {
      code: string;
      location: string;
      actor: string;
    } = req.body;

    const data = {
      code,
      location,
      actor,
    };
    const fireCreate: Model<IFire> | null = await FireExtinguisher.create({
      ...data,
    });

    if (!fireCreate) {
      return res.status(404).json({ message: "Fail to Create" });
    }

    return res.status(201).json({ message: "Create FireExtinguisher success" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateFireExtinguisher = async (req: RequestAndFire, res: Response) => {
  try {
    const { id } = req.params;
    const { code, location, actor } = req.body;
    const updateUser: any = await FireExtinguisher.update(
      {
        code,
        location,
        actor,
      },
      {
        where: {
          id,
        },
      }
    );

    console.log(updateUser);
    // if (!updateUser) {
    //   return res.status(404).json({ message: "Fail to update" });
    // }
    return res.status(200).json({ message: "Update success" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getFireExtinguisher = async (req: RequestAndFire, res: Response) => {
  try {
    const allFireExtinguishers: Model<IFire>[] = await FireExtinguisher.findAll();
    
    return res.status(200).json({
      total: allFireExtinguishers.length,
      items: allFireExtinguishers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve fire extinguisher data" });
  }
};



const getFireExtinguisherById = async (req: RequestAndFire, res: Response) => {
  try {
    const fire: IFire = req.fire!;
    const { id } = req.params;
    const findFireExingurisherById: Model<IFire>[] | null =
      await FireExtinguisher.findAll({
        where: {
          id,
        },
      });
    return res.status(200).json(findFireExingurisherById);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteFireExtinguisher = async (req: RequestAndFire, res: Response) => {
  try {
    const { id } = req.params;
    const user: IFire = req.fire!;

    const deletedUser: null | Model<IFire> = await FireExtinguisher.findOne({
      where: { id },
    });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await deletedUser.destroy();

    return res.status(200).json({ message: "FireExtingGruisher deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createFireExtinguisher,
  updateFireExtinguisher,
  getFireExtinguisher,
  getFireExtinguisherById,
  deleteFireExtinguisher,
};
