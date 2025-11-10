import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { z } from "zod";

// Validation schema for token validation request
const validateTokenSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export const Route = createFileRoute("/api/auth/validate-token")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        console.info("Processing token validation request... @", request.url);

        try {
          const body = await request.json();
          const { token } = validateTokenSchema.parse(body);

          // Call the external validation API
          const validateAuthTokenUrl =
            "https://api.proxy.account.redbiller.com/api/v1/auth/login/crosslink/validate";

          const response = await fetch(validateAuthTokenUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          const data = await response.json();

          // Log on server side
          console.log("Token validation response:", {
            status: response.status,
            data,
          });

          if (!response.ok) {
            return json(
              {
                success: false,
                error: data.error || "Token validation failed",
                status: response.status,
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

          console.error("Token validation error:", error);
          return json(
            {
              success: false,
              error: "Internal server error",
              message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
          );
        }
      },
    },
  },
});
