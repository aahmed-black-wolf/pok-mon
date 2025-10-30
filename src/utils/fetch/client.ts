"use client";
import jsCookie from "js-cookie";
import ky, { BeforeRequestHook } from "ky";
import merge from "lodash.merge";
import { kyConfigs } from "../config/ky";

const cookieInterceptor: BeforeRequestHook = async (request) => {
  const token = jsCookie.get("token");
  const locale = "en";
  const currency = jsCookie.get("currency");
  const country = jsCookie.get("country");

  request.headers.set("Accept", "application/json, text/plain, */*");
  request.headers.set("source", "web");

  if (currency) {
    request.headers.set("Accept-Currency", currency);
  }
  if (country) {
    request.headers.set("Accept-Country", country);
  }
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
  if (locale) {
    request.headers.set("X-Locale", locale);
    request.headers.set("accept-language", locale);
  }
};

export const clientFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    throwHttpErrors: false,
    hooks: {
      beforeRequest: [cookieInterceptor],
      afterResponse: [
        async (_input: Request, _options: Request, response: Response) => {
          // Clone response before reading body (body can only be read once)
          const clonedResponse = response.clone();

          // Read response body once (can only be read once)
          let body;
          try {
            body = await clonedResponse.json();
          } catch {
            // If response body is not JSON, create a simple error object
            body = {
              message: response.statusText || `HTTP ${response.status}`,
            };
          }

          // Check HTTP status codes first (since throwHttpErrors is false)
          if (!response.ok) {
            throw new Error(
              JSON.stringify({
                status: response.status,
                statusText: response.statusText,
                errors: body.errors || body.message || body,
              })
            );
          }

          // Also check for errors in response body even if status is OK
          if (body.errors) {
            throw new Error(JSON.stringify(body));
          }

          return response;
        },
      ],
    },
  })
);
