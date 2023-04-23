import { Product, Variation } from "@/types/products";
import wpApi from "@/utils/wp-api";

export const getProductBySlug = async (
  slug?: string
): Promise<Product | null> => {
  if (!slug) {
    return null;
  }

  const { data } = await wpApi.get("products", {
    slug,
  });

  if (!data.length) {
    return null;
  }

  return data[0];
};

export const findProductsByIds = async (ids: number[]): Promise<Product[]> => {
  const { data } = await wpApi.get("products", {
    include: ids,
  });
  return data || [];
};

export const findProductVariations = async (
  productId: number
): Promise<Variation[]> => {
  const { data } = await wpApi.get(`products/${productId}/variations`);
  return data;
};

export const findAllProducts = async (): Promise<Product[]> => {
  const { data } = await wpApi.get("products");
  return data;
};
