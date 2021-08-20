export type BaseResponse = {
  error: {
    instance: Error;
    message: string;
  } | null;
};
