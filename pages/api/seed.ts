import type { NextApiRequest, NextApiResponse } from "next";
import main from "../../seed";

const seed = async (req: NextApiRequest, res: NextApiResponse) => {

  await main();
  res.status(200).json({ message: "Seed done" });
};

export default seed;