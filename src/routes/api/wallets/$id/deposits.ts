import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import apiClient, {
  createApiCredentials,
  initializeProductKeys,
} from "../../../../lib/api-client";
import { encodeCredentials, encodeToBase64 } from "@/lib";

// Track if keys are initialized
let keysInitialized = false;

// Helper function to parse cookies from request header
function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce(
    (cookies, cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookies[name] = value;
      return cookies;
    },
    {} as Record<string, string>
  );
}

export const Route = createFileRoute("/api/wallets/$id/deposits")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        console.info("Fetching wallet deposits... @", request.url);

        const { id } = params;
        console.log("Wallet ID:", id);

        if (!id) {
          return json(
            {
              success: false,
              error: "Wallet ID is required",
            },
            { status: 400 }
          );
        }

        // Initialize product keys if not already done
        if (!keysInitialized) {
          try {
            await initializeProductKeys();
            keysInitialized = true;
            console.log("Product keys initialized successfully");
          } catch (error) {
            console.error("Failed to initialize product keys:", error);
            return json(
              {
                success: false,
                error: "Configuration error",
                message: "Failed to initialize API credentials",
              },
              { status: 500 }
            );
          }
        }

        // Parse cookies from request headers
        const cookies = parseCookies(request.headers.get("cookie"));
        const userKey = cookies.userKey;
        const accountKey = cookies.accountKey;
        const sessionId = cookies.sessionId;

        if (!userKey || !accountKey || !sessionId) {
          console.log("Missing credentials!");
          return json(
            {
              success: false,
              error: "Unauthorized",
              message: "Missing credentials",
            },
            { status: 401 }
          );
        }

        const url = new URL(request.url);

        // Extract query parameters
        const start_date = url.searchParams.get("start_date");
        const end_date = url.searchParams.get("end_date");
        const status = url.searchParams.get("status");
        const page = url.searchParams.get("page");
        const limit = url.searchParams.get("limit");

        // Build query params object
        const queryParams: Record<string, any> = {
          destination: { wallet_key: id },
        };

        if (start_date) queryParams.start_date = start_date;
        if (end_date) queryParams.end_date = end_date;
        if (status) queryParams.status = status;

        if (page || limit) {
          queryParams.pagination = {};
          if (page) queryParams.pagination.page = Number(page);
          if (limit) {
            const limitNum = Number(limit);
            queryParams.pagination.limit = limitNum > 100 ? 100 : limitNum;
          }
        }

        // Create credentials object
        const credentials = createApiCredentials(
          userKey,
          accountKey,
          sessionId
        );

        // Encode to base64 string for the header
        const credentialsHeader = encodeCredentials(credentials);

        console.log("Query params:", queryParams);

        try {
          const endpoint = `1.0/Customers/Wallets/Deposits/Fiat/NG/Fetch?payload=${encodeToBase64(queryParams)}`;

          const response = await apiClient.get(endpoint, undefined, {
            Credentials: credentialsHeader,
          });

          console.log("response", response);

          // Handle "No data" response (code 2003) as success with empty data
          if (response.code === 2003) {
            console.log("No deposits found");
            return json({
              success: true,
              data: [],
              meta: response.meta || {
                pagination: {
                  page: 1,
                  limit: 25,
                },
              },
            });
          }

          // Check if the request was successful
          if (response.code !== 2000) {
            console.error("Failed to fetch deposits:", response.message);
            return json(
              {
                success: false,
                error: response.message,
                data: response.data,
              },
              { status: 500 }
            );
          }

          // Transform the API response to match the expected format
          const transformedData = {
            success: true,
            data: response.data.map((deposit: any) => ({
              id: deposit.id,
              reference: deposit.reference,
              type: deposit.type,
              mode: deposit.mode,
              category: deposit.category,
              service: `${deposit.type} - ${deposit.category}`,
              currency: deposit.currency.symbol,
              currencyCode: deposit.currency.code,
              amount: `${deposit.currency.symbol}${deposit.amount.toFixed(2)}`,
              fee: `${deposit.currency.symbol}${deposit.fee.toFixed(2)}`,
              narration: deposit.narration,
              wallet: {
                reference: deposit.wallet.reference,
                title: deposit.wallet.title,
              },
              sender: {
                name: deposit.sender.name,
                accountNumber: deposit.sender.account?.number || "N/A",
                accountName: deposit.sender.account?.name || "N/A",
                bankName: deposit.sender.bank?.name || "N/A",
                bankCode: deposit.sender.bank?.code || "N/A",
              },
              status: deposit.status,
              date: new Date(deposit.date_created).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
              time: new Date(deposit.date_created).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              dateCreated: deposit.date_created,
              dateModified: deposit.date_modified,
            })),
            meta: response.meta,
          };

          return json(transformedData);
        } catch (error) {
          console.error("Error fetching deposits:", error);
          return json(
            {
              success: false,
              error: "Internal server error",
              message:
                error instanceof Error
                  ? error.message
                  : "An unexpected error occurred",
            },
            { status: 500 }
          );
        }
      },
    },
  },
});
