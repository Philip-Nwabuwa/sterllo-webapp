import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { z } from "zod";

// Validation schema for sub-accounts request
const subAccountsSchema = z.object({
  key: z.string().min(1, "Key is required"),
  session_id: z.string().min(1, "Session ID is required"),
});

export const Route = createFileRoute("/api/auth/sub-accounts")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info("Processing sub-accounts fetch request... @", request.url);

        try {
          // Extract key and session_id from headers
          const key = request.headers.get("key");
          const session_id = request.headers.get("session_id");

          // Validate the headers
          const validated = subAccountsSchema.parse({ key, session_id });

          // Call the sub-accounts API
          // Use 127.0.0.1 instead of localhost to avoid DNS resolution issues in Node.js
          const subAccountsUrl =
            "http://127.0.0.1:5001/api/v1/auth/sub-accounts/fetch";

          console.log("Calling sub-accounts API:", {
            url: subAccountsUrl,
            headers: { key: validated.key, session_id: validated.session_id },
          });

          const response = await fetch(subAccountsUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
              Origin: "http://localhost:3000",
              key: validated.key,
              session_id: validated.session_id,
            },
          });

          console.log("Response status:", response.status, response.statusText);
          console.log(
            "Response headers:",
            Object.fromEntries(response.headers.entries())
          );

          // Get response as text first to see what we're actually getting
          const responseText = await response.text();
          console.log("Raw response body:", responseText);

          let data;
          try {
            data = JSON.parse(responseText);
          } catch (e) {
            console.error("Failed to parse response as JSON:", e);
            data = { error: "Invalid JSON response", raw: responseText };
          }

          // Log on server side
          console.log("Sub-accounts fetch response:", {
            status: response.status,
            data,
          });

          if (!response.ok) {
            console.error("Backend returned error:", {
              status: response.status,
              statusText: response.statusText,
              data,
              rawResponse: responseText,
            });

            return json(
              {
                success: false,
                error:
                  data.message || data.error || "Failed to fetch sub-accounts",
                status: response.status,
                debug: {
                  url: subAccountsUrl,
                  method: "GET",
                  headers: {
                    key: validated.key,
                    session_id: validated.session_id,
                  },
                  responseStatus: response.status,
                  responseBody: data,
                },
              },
              { status: response.status }
            );
          }

          return json({
            success: true,
            data,
          });
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error("Validation error:", error.issues);
            return json(
              {
                success: false,
                error: "Validation error",
                details: error.issues,
              },
              { status: 400 }
            );
          }

          console.error("Sub-accounts fetch error:", error);

          // Check if it's a network error
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          const isNetworkError =
            errorMessage.includes("fetch") ||
            errorMessage.includes("ECONNREFUSED") ||
            errorMessage.includes("network");

          return json(
            {
              success: false,
              error: isNetworkError
                ? "Cannot connect to backend API server. Please ensure the API server is running on port 5001."
                : "Internal server error",
              message: errorMessage,
              details: {
                attemptedUrl:
                  "http://127.0.0.1:5001/api/v1/auth/sub-accounts/fetch",
                suggestion: isNetworkError
                  ? "Check if your backend API server is running and accessible"
                  : "See server logs for more details",
              },
            },
            { status: 500 }
          );
        }
      },
    },
  },
});
