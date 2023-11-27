import dotenv from "dotenv";
import path from "path";
import payload from "payload";
import { InitOptions } from "payload/config";
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

let cache = (global as any).payload;

if (!cache) {
  cache = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args) => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }
  if (cache.client) {
    return cache.client;
  }
  if (!cache.promise) {
    cache.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }
  try {
    cache.client = await cache.promise;
  } catch (e: unknown) {
    cache.promise = null;
    throw e;
  }

  return cache.client;
};
