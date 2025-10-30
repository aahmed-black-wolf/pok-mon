import type { BeforeErrorHook, Options } from "ky";

const errorInterceptor: BeforeErrorHook = async (error) => {
  /** We can have shared hooks in here, or specifc hooks inside client, or server files */
  return error;
};

export const kyConfigs: Options = {
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 60000,
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
  },
  hooks: {
    beforeError: [errorInterceptor],
  },
};
