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

export const Route = createFileRoute("/api/wallets/$id/transfers")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        console.info("Fetching wallet transfers... @", request.url);

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
          source: { wallet_key: id },
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
          const endpoint = `1.0/Customers/Wallets/Payments/Transfers/Fetch?payload=${encodeToBase64(queryParams)}`;

          const response = await apiClient.get<{
            code: number;
            state: boolean;
            message: string;
            data: Array<{
              id: string;
              reference: string;
              type: string;
              mode: string;
              category: string;
              currency: {
                name: string;
                code: string;
                symbol: string;
                flag: string;
              };
              amount: number;
              fee: number;
              narration: string;
              sender: {
                name: string;
                wallet: {
                  reference: string;
                  title: string;
                };
              };
              recipient: {
                name: string;
                wallet: {
                  reference: string;
                  title: string;
                };
              };
              status: string;
              date_created: string;
              date_modified?: string;
            }>;
            meta: {
              pagination: {
                page: number;
                limit: number;
              };
            };
          }>(endpoint, undefined, { Credentials: credentialsHeader });

          console.log("response", response);

          // Handle "No data" response (code 2003) as success with empty data
          if (response.code === 2003) {
            console.log("No transfers found");
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
            console.error("Failed to fetch transfers:", response.message);
            return json(
              {
                success: false,
                error: response.message,
              },
              { status: 500 }
            );
          }

          // Transform the API response to match the expected format
          const transformedData = {
            success: true,
            data: response.data.map((transfer) => ({
              id: transfer.id,
              reference: transfer.reference,
              type: transfer.type,
              mode: transfer.mode,
              category: transfer.category,
              service: `${transfer.type} - ${transfer.category}`,
              currency: transfer.currency.symbol,
              currencyCode: transfer.currency.code,
              amount: `${transfer.currency.symbol}${transfer.amount.toFixed(2)}`,
              fee: `${transfer.currency.symbol}${transfer.fee.toFixed(2)}`,
              narration: transfer.narration,
              sender: {
                name: transfer.sender.name,
                walletReference: transfer.sender.wallet.reference,
                walletTitle: transfer.sender.wallet.title,
              },
              recipient: {
                name: transfer.recipient.name,
                walletReference: transfer.recipient.wallet.reference,
                walletTitle: transfer.recipient.wallet.title,
              },
              status: transfer.status,
              date: new Date(transfer.date_created).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              ),
              time: new Date(transfer.date_created).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ),
              dateCreated: transfer.date_created,
              dateModified: transfer.date_modified,
            })),
            meta: response.meta,
          };

          return json(transformedData);
        } catch (error) {
          console.error("Error fetching transfers:", error);
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
