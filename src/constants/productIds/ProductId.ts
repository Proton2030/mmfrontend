import { Platform } from 'react-native';

export const PLAY_STORE_PRODUCT = {
  BASIC_PLAN: 'basic_plan',
  SILVER_PLAN: 'silver_plan',
  GOLD_PLAN: 'gold_plan',
  DIAMOND_PLAN: 'diamond_plan',
};

const productSkus = Platform.select({
  android: [
    PLAY_STORE_PRODUCT.BASIC_PLAN,
    PLAY_STORE_PRODUCT.SILVER_PLAN,
    PLAY_STORE_PRODUCT.SILVER_PLAN,
    PLAY_STORE_PRODUCT.DIAMOND_PLAN,
  ],
});
export const PRODUCT_ID_LIST = {
  productSkus,
};
