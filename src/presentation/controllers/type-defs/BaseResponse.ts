export type BaseResponse = {
  message: string;
  error: {
    instance: Error;
  } | null;
};
