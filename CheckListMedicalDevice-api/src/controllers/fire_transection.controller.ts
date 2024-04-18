import { Model } from "sequelize";
import { IFireTransection } from "../interfaces/fire_transection.interface";
import { FireExtinguisher } from "../models/fire.model";
import { FireTransection } from "../models/firetransection.model";

async function generateFireTransections() {
  try {
    const findFire: Model<IFireTransection>[] = await FireExtinguisher.findAll();
    if (findFire.length === 0) {
      throw new Error("No fire extinguishers found.");
    }
    console.log(findFire);
    const FireTransectionPromises = findFire.map(async (fire) => {
      try {
        const bill = await FireTransection.create({
          code: fire.dataValues.code,
          location: fire.dataValues.location,
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

export default {
  generateFireTransections,
};
