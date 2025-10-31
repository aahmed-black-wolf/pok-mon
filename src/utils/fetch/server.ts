import ky, { BeforeRequestHook } from "ky";
import merge from "lodash.merge";
import { cookies } from "next/headers";
import { kyConfigs } from "../config/ky";

const cookieInterceptor: BeforeRequestHook = async (request) => {
  const token = (await cookies()).get("token")?.value;
  const currency = (await cookies()).get("currency")?.value;
  const country = (await cookies()).get("country")?.value;
  const newLocale = "en";
  request.headers.set("Accept", "application/json, text/plain, */*");
  request.headers.set("source", "web");

  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
  if (currency) {
    request.headers.set("Accept-Currency", currency);
  }
  if (country) {
    request.headers.set("Accept-Country", country);
  }
  if (newLocale) {
    request.headers.set("X-Locale", newLocale);
    request.headers.set("accept-language", newLocale);
  }
};

export const serverFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    hooks: {
      afterResponse: [
        async (_input: Request, _options: Request, response: Response) => {
          const clonedResponse = response.clone();

          let body;
          try {
            body = await clonedResponse.json();
          } catch {
            body = {
              message: response.statusText || `HTTP ${response.status}`,
            };
          }

          if (!response.ok) {
            throw new Error(
              JSON.stringify({
                status: response.status,
                statusText: response.statusText,
                errors: body.errors || body.message || body,
              })
            );
          }

          if (body.errors) {
            throw new Error(JSON.stringify(body));
          }

          return response;
        },
      ],
      beforeRequest: [cookieInterceptor],
    },
  })
);
