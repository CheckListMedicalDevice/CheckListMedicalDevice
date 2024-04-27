import { Model, Op } from "sequelize";
import { IFireTransection, RequestAndFireTransection } from "../interfaces/fire_transection.interface";
import { FireExtinguisher } from "../models/fire.model";
import { FireTransection } from "../models/firetransection.model";
import { IFire, RequestAndFire } from "../interfaces/fire.interface";
import { Response } from "express";


async function generateFireTransections() {
  try {
    const findFire: Model<IFireTransection>[] = await FireExtinguisher.findAll();
    if (findFire.length === 0) {
      throw new Error("No fire extinguishers found.");
    }
    
    const FireTransectionPromises = findFire.map(async (fire) => {
      try {
        const bill = await FireTransection.create({
          code: fire.dataValues.code,
          location: fire.dataValues.location,
          note: fire.dataValues.note,
          status: fire.dataValues.status,
          statusActive: fire.dataValues.statusActive,
        });
        if (!bill) {
          throw new Error("Error creating bill.");
        }
      } catch (error: any) {
        throw new Error(
          `Error creating bill for fire extinguisher ${fire.dataValues.id}: ${error.message}`
        );
      }
    });
    await Promise.all(FireTransectionPromises);
    console.log("Bills generated successfully for all fire extinguishers.");
  } catch (error) {
    console.error("Error generating fire transactions:", error);
  }
}

const getBillsByAdmin = async (req: RequestAndFire, res: Response) => {
  try {
    const { date } = req.query;

    const findLengthExtinguisher: number = await FireExtinguisher.count({
      where: { fireId: req.fire },
    });

    const findBillsByLand: Model<IFire>[] | null = await FireExtinguisher.findAll({
      where: {
        fireId: req.fire,
        createdAt: date ? date : { [Op.ne]: null },
      },
      order: [["createdAt", "DESC"]],
      limit: findLengthExtinguisher,
    });

    return res.status(200).json(findBillsByLand);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getBillFireExtingruisher = async (req: RequestAndFire, res: Response) => {
  try {
    const allFireExtinguishers: Model<IFireTransection>[] = await FireTransection.findAll();
    
    return res.status(200).json({
      total: allFireExtinguishers.length,
      items: allFireExtinguishers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve fire extinguisher data" });
  }
};

const updateFireExtinguisherTransection = async (req: RequestAndFireTransection, res: Response) => {
  try {
    const { id } = req.params;
    const { code, location, note, statusActive,status } = req.body;
    const updateFireExtinguisher: any = await FireTransection.update(
      {
      
        note,
        statusActive,
        status
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

export default {
  generateFireTransections,
  getBillsByAdmin,
  getBillFireExtingruisher,
  updateFireExtinguisherTransection
};
