import { Request, Response } from "express";
import dotenv from "dotenv";
import { ITools, RequsetAndTools } from "../interfaces/tools.interface";

import { Model } from "sequelize";
import { Tools } from "../models/tools.model";

dotenv.config();

// const self = async (req: RequsetAndTools, res: Response) => {
//   return res.status(200).json(req.tools);
// };

const createTools = async (req: Request, res: Response) => {
  try {
    const {
      name,
      count,
      note,
    }: {
      name: string;
      note?: string;
      count: number;
    } = req.body;

 


    const exitTools: Model<ITools> | null = await Tools.findOne({
      where: { name },
    });

    if (exitTools) {
      return res.status(400).json({
        message: `There is already a name ${name}.`,
      });
    }

    const data = {
      name,
      note,
      count,
    };
    const toolsCreate: Model<ITools> | null = await Tools.create({
      ...data,
    });

    if (!toolsCreate) {
      return res.status(404).json({ message: "Fail to Create" });
    }

    return res.status(201).json({ message: "Create Tools success" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getTools = async (req: RequsetAndTools, res: Response) => {
  try {
    const allTools: Model<ITools>[] = await Tools.findAll();

    return res.status(200).json({
      total: allTools.length,
      items: allTools,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

const getToolsById = async (req: RequsetAndTools, res: Response) => {
  try {
    const { id } = req.params;
    const findToolsById: Model<ITools> | null = await Tools.findByPk(id);
    
    return res.status(200).json(findToolsById);
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTools = async (req: RequsetAndTools, res: Response) => {
  try {
    const { id } = req.params;
    const { name, note, count } = req.body;
    const updateTools: any = await Tools.update(
      {
        name,
        note,
        count,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).json({ message: "Update Success " });
  } catch (error) {
    return res.status(500).json({ massage: "Something went wrong " });
  }
};

const updateToolsSelf = async (req: RequsetAndTools, res: Response) => {
  const tools: ITools = req.tools!;
  const {
    name,
    note,
    count,
  }: {
    name?: string;
    note?: string;
    count?: string;
  } = req.body;
};

const deleteTools = async (req: RequsetAndTools, res: Response) => {
  try {
    const { id } = req.params;
    const tools: ITools = req.tools!;

    const deleteTools: null | Model<ITools> = await Tools.findOne({
      where: {
        id,
      },
    });

    if (!deleteTools) {
      return res.status(404).json({
        message: "Tools Note found",
      });
    }
    await deleteTools?.destroy();

    return res.status(200).json({
      message: "Tools Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default {
  createTools,
  getTools,
  updateTools,
  deleteTools,
//   self,
  updateToolsSelf,
  getToolsById,
};
