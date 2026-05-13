import data from "../database/food.json" with { type: "json" };

// export interface IOrder {
//   id: string;
//   customer: string;
//   quantity: number;
//   food: string;
//   price: number;
// }

export type IOrder = (typeof data)[number];
