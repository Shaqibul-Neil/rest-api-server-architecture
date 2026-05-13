import path from "path";
import fs from "fs/promises"; //to use only the async operation of fs
import type { IOrder } from "../types/food.types";

const DB_PATH = path.join(process.cwd(), "src", "database", "food.json");
// console.log("DB_PATH", DB_PATH);
// console.log(
//   "fs.readdir",
//   await fs.readdir(path.join(process.cwd(), "src", "database")),
// );

class OrderService {
  //read data, write data
  private async readData(): Promise<IOrder[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      // console.log(data);
      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to read database:", error);
      return [];
    }
  }
  private async writeData(data: IOrder[]) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  //GET
  async getAllOrders() {
    const data = await this.readData();
    return data;
  }

  //GET by id
  async getOrderById(id: string) {
    const data = await this.readData();
    const order = data.find((d) => d.id === id) || null;
    // console.log(order);
    return order;
  }

  //create
  async createOrder(order: Omit<IOrder, "id">) {
    const data = await this.readData();
    const newOrder = {
      id: String(Math.random() * 100),
      ...order,
    };

    data.push(newOrder);
    await this.writeData(data);
    return newOrder;
  }

  //Update
  async updateOrder(
    id: string,
    order: Partial<Omit<IOrder, "id">>,
  ): Promise<IOrder | null> {
    const data = await this.readData();
    const index = data.findIndex((d) => d.id === id);
    if (index === -1) {
      return null;
    }
    data[index] = {
      ...data[index],
      ...order,
    } as IOrder;

    await this.writeData(data);
    return data[index];
  }

  //delete
  async deleteOrder(id: string) {
    const data = await this.readData();
    const index = data.findIndex((d) => d.id === id);
    if (index === -1) {
      return null;
    }
    data.splice(index, 1);
    await this.writeData(data);
    return true;
  }
}
export const orderService = new OrderService();
