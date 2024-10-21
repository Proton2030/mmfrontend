import { PLAY_STORE_PRODUCT } from '../../constants/productIds/ProductId';

export const productToChatCount = (product_id: string) => {
  switch (product_id) {
    case PLAY_STORE_PRODUCT.BASIC_PLAN:
      return 1;
    case PLAY_STORE_PRODUCT.SILVER_PLAN:
      return 5;
    case PLAY_STORE_PRODUCT.GOLD_PLAN:
      return 10;
    case PLAY_STORE_PRODUCT.DIAMOND_PLAN:
      return 20;
    default:
      return 1;
  }
};
