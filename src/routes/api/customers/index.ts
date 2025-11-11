import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import apiClient, {
  createApiCredentials,
  initializeProductKeys,
} from "../../../lib/api-client";
import { encodeCredentials, encodeToBase64 } from "@/lib";
import type { CustomerApiResponse, FetchCustomersQuery } from "@/types/api";

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

export const Route = createFileRoute("/api/customers/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info("Fetching customers... @", request.url);

        // Initialize product keys if not already done (server-side only)
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

        console.log("Cookies parsed:", {
          hasUserKey: !!userKey,
          hasAccountKey: !!accountKey,
          hasSessionId: !!sessionId,
        });

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
        const type = url.searchParams.get(
          "type"
        ) as FetchCustomersQuery["type"];
        const name = url.searchParams.get("name");
        const status = url.searchParams.get(
          "status"
        ) as FetchCustomersQuery["status"];
        const start_date = url.searchParams.get("start_date");
        const end_date = url.searchParams.get("end_date");
        const phone_number = url.searchParams.get("phone_number");
        const email_address = url.searchParams.get("email_address");
        const page = url.searchParams.get("page");
        const limit = url.searchParams.get("limit");

        const queryParams: Record<string, any> = {};

        if (type) queryParams.type = type;
        if (name) queryParams.name = name;
        if (status) queryParams.status = status;
        if (start_date) queryParams.start_date = start_date;
        if (end_date) queryParams.end_date = end_date;

        // Handle contacts object
        if (phone_number || email_address) {
          queryParams.contacts = {};
          if (phone_number) queryParams.contacts.phone_number = phone_number;
          if (email_address) queryParams.contacts.email_address = email_address;
        }

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
          const endpoint =
            Object.keys(queryParams).length > 0
              ? `1.0/Customers/Fetch?payload=${encodeToBase64(queryParams)}`
              : "1.0/Customers/Fetch";

          const response = await apiClient.get<CustomerApiResponse>(
            endpoint,
            undefined, // no params
            { Credentials: credentialsHeader }
          );

          console.log("API Response received:", {
            code: response.code,
            dataLength: response.data?.length,
          });

          // Handle "No data" response (code 2003) as success with empty data
          if (response.code === 2003) {
            console.log("No customers found");
            return json({
              data: [],
              total: 0,
              metrics: {
                totalCustomers: 0,
                activeCustomers: 0,
                newCustomers: 0,
              },
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
            console.error("Failed to fetch customers:", response.message);
            return json(response, { status: 500 });
          }

          // Transform the response to match the component's expected format
          const transformedData = {
            data: response.data.map((customer) => ({
              id: customer.id,
              name: [
                customer.profile.bio.first_name,
                customer.profile.bio.middle_name
                  ? customer.profile.bio.middle_name
                  : null,
                customer.profile.bio.surname,
              ]
                .filter((part) => part && part !== "null" && part !== null)
                .join(" "),
              email: customer.profile.contacts.email_address,
              phone: customer.profile.contacts.phone_number,
              pnd: customer.constraints.pnd,
              status: customer.status,
              kycStatus: customer.kyc.status ? "verified" : "pending",
              nationality: customer.profile.bio.nationality,
              reference: customer.reference,
              dateCreated: customer.date_created,
            })),
            total: response.data.length,
            metrics: {
              totalCustomers: response.data.length,
              activeCustomers: response.data.filter(
                (c) => c.status.toLowerCase() === "active"
              ).length,
              newCustomers: response.data.filter((c) => {
                const createdDate = new Date(c.date_created);
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return createdDate > sevenDaysAgo;
              }).length,
            },
            meta: response.meta,
          };

          return json(transformedData);
        } catch (error) {
          console.error("Error fetching customers:", error);
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
