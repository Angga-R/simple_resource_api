import { prismaClient } from "../app/database.js";

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

export default {
  showData,
};
