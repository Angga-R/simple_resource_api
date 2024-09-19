import { prismaClient } from "./database.js";
import Joi from "joi";

const showData = async (req, res, next) => {
  try {
    const result = await prismaClient.murid.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(result);
  } catch (error) {
    next("Failed to get data");
  }
};

const addData = async (req, res, next) => {
  try {
    const addDataValidate = (value) => {
      const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        kelas: Joi.string().max(10).required(),
      });

      const result = schema.validate(value, {
        abortEarly: false,
        allowUnknown: false,
      });

      if (result.error) {
        next(result.error.message);
        end();
      }

      return result.value;
    };

    const validate = addDataValidate(req.body);

    const checkDataInDatabase = await prismaClient.murid.count({
      where: {
        AND: {
          name: validate.name,
          kelas: validate.kelas,
        },
      },
    });

    if (checkDataInDatabase !== 0) {
      next("Data Already exist");
      end();
    }

    await prismaClient.murid.create({
      data: {
        name: validate.name,
        kelas: validate.kelas,
      },
    });

    res.status(200).send("Add Data Successfull");
  } catch (e) {
    next("Failed to add data :" + e);
  }
};

export default {
  showData,
  addData,
};
