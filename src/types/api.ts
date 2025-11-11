// API Types and Interfaces

export interface ApiCredentials {
  "User-Key": string;
  "Account-Key": string;
  "Session-Id": string;
  "Request-Source": "WEB";
  "Request-Id": string;
  "Source-Product-Key": string;
  "Target-Product-Key": string;
}

export interface ApiRequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: number;
  state?: boolean;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  code?: number;
  status?: number;
  details?: any;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// Customer API Types
export interface CustomerApiResponse {
  code: number;
  state: boolean;
  message: string;
  data: CustomerData[];
  meta: {
    pagination: {
      page: number;
      limit: number;
    };
  };
}

export interface CustomerData {
  id: string;
  type: string;
  environment?: string;
  profile: {
    bio: {
      first_name: string;
      middle_name?: string;
      surname: string;
      date_of_birth: string;
      nationality: {
        name: string;
        code: string;
        flag: string;
      };
    };
    contacts: {
      phone_number: string;
      email_address: string;
    };
  };
  business: {
    name: string;
    rn: string;
    address: {
      state: string;
      city: string;
      line: string;
    };
  };
  kyc: {
    tier: number;
    status: boolean;
  };
  constraints: {
    pnd: boolean;
  };
  status: string;
  reference: string;
  parent_reference?: string;
  date_created: string;
}

export interface FetchCustomersQuery {
  reference?: string;
  type?: "PERSONAL" | "BUSINESS";
  name?: string;
  status?: "ACTIVATED" | "COMPLETED" | "PENDING";
  contacts?: {
    phone_number?: string;
    email_address?: string;
  };
  start_date?: string;
  end_date?: string;
  pagination?: {
    page?: number;
    limit?: number;
  };
}

export type WalletApiResponse = {
  code: number;
  state: boolean;
  message: string;
  data: Array<{
    title: string;
    key: string;
    environment: string;
    reference: string;
    currency: {
      name: string;
      code: string;
      category: string;
      symbol: string;
      flag: string;
    };
    contacts: {
      email_address: string;
      phone_number: string;
    };
    balances: {
      actual: number;
      available: number;
      pending: number;
      dispute: number;
      locked: number;
      limits: {
        min: number;
        max: number;
        overdraft: {
          max: number;
          balance: {
            used: number;
            left: number;
          };
          access: boolean;
          status: boolean;
          contract_code: any;
        };
      };
    };
    limits: {
      credit: {
        range: {
          min: number;
          max: number;
        };
        duration: {
          daily: {
            value: number;
            volume: number;
          };
          weekly: {
            value: number;
            volume: number;
          };
          monthly: {
            value: number;
            volume: number;
          };
        };
        cumulative: {
          total: {
            value: number;
            volume: number;
          };
          duration: {
            daily: {
              value: number;
              volume: number;
            };
            weekly: {
              value: number;
              volume: number;
            };
            monthly: {
              value: number;
              volume: number;
            };
          };
        };
      };
      debit: {
        range: {
          min: number;
          max: number;
        };
        duration: {
          daily: {
            value: number;
            volume: number;
          };
          weekly: {
            value: number;
            volume: number;
          };
          monthly: {
            value: number;
            volume: number;
          };
        };
        cumulative: {
          total: {
            value: number;
            volume: number;
          };
          duration: {
            daily: {
              value: number;
              volume: number;
            };
            weekly: {
              value: number;
              volume: number;
            };
            monthly: {
              value: number;
              volume: number;
            };
          };
        };
      };
    };
    constraints: {
      pnd: {
        custom: boolean;
        default: boolean;
      };
      pnc: {
        custom: boolean;
        default: boolean;
      };
      readonly: {
        default: boolean;
      };
    };
    date_created: string;
    date_modified?: string;
  }>;
  meta: {
    pagination: {
      page: number;
      limit: number;
    };
  };
};

// Enhanced Error Handling Types
export type ErrorType =
  | "network"
  | "timeout"
  | "authentication"
  | "authorization"
  | "server"
  | "client"
  | "unknown";

export interface EnhancedError {
  type: ErrorType;
  message: string;
  userMessage: string;
  details?: string;
  suggestion?: string;
  canRetry: boolean;
  statusCode?: number;
  originalError?: any;
}
