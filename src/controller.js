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
  } catch (err) {
    next("Failed to get data");
  }
};

const addData = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      kelas: Joi.string().max(10).required(),
    });

    const validateInput = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (validateInput.error) {
      next(validateInput.error.message);
      end();
    }

    const checkDataInDatabase = await prismaClient.murid.count({
      where: {
        AND: {
          name: validateInput.value.name,
          kelas: validateInput.value.kelas,
        },
      },
    });

    if (checkDataInDatabase !== 0) {
      next("Data already exist");
      end();
    }

    await prismaClient.murid.create({
      data: {
        name: validateInput.value.name,
        kelas: validateInput.value.kelas,
      },
    });

    res.status(200).send("Add data successfull");
  } catch (err) {
    next("Failed to add data");
  }
};

export default {
  showData,
  addData,
};
