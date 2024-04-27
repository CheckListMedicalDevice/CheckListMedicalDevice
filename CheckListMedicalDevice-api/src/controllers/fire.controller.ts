import { Request, Response } from "express";
import dotenv from "dotenv";
import { IFire, RequestAndFire } from "../interfaces/fire.interface";
import { FireExtinguisher } from "../models/fire.model";
import { Model, Op } from "sequelize";
import { IFireTransection } from "../interfaces/fire_transection.interface";
import { FireTransection } from "../models/firetransection.model";

dotenv.config();

const self = async (req: RequestAndFire, res: Response) => {
  return res.status(200).json(req.fire);
};


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

    const exitTools: Model<IFire> | null = await FireExtinguisher.findOne({
      where: { code },
    });
    if (exitTools) {
      return res.status(400).json({
        message: `There is already a name ${code}.`,
      });
    }

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

const updateFireExtinguisher = async (req: RequestAndFire, res: Response) => {
  try {
    const { id } = req.params;
    const { code, location, actor } = req.body;
    const updateFireExtinguisher: any = await FireExtinguisher.update(
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

    return res.status(200).json({ message: "Update success" });
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

const updateFireExtinguisherSelf = async (req: RequestAndFire, res: Response) => {
  const fire: IFire = req.fire!;
  const {
      code,
      location,
      
  }: {
    code?: string;
    location?: string;

  } = req.body;
}



export default {
  createFireExtinguisher,
  updateFireExtinguisher,
  getFireExtinguisher,
  getFireExtinguisherById,
  deleteFireExtinguisher,
  updateFireExtinguisherSelf,
  self,
};
