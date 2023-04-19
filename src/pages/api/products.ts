import wpApi from "@/utils/wp-api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data } = await wpApi.get("products", { per_page: 50 });
    return res.status(200).json(data);
  }
  return res.status(400);
}
