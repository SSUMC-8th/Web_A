export interface LpDto {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

export type CartItems = LpDto[];
