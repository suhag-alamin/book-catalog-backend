type IOrder = {
  bookId: string;
  quantity: number;
};

export type ICreateOrder = {
  orderedBooks: IOrder[];
};
