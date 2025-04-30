export type CommenResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};
