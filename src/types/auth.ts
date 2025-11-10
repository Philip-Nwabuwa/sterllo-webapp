export type ValidateTokenResponse = {
  success: boolean;
  data: {
    code: number;
    state: boolean;
    message: string;
    data: {
      profile: {
        key: string;
        bio: {
          first_name: any;
          surname: any;
          other_names: any;
          gender: any;
          date_of_birth: any;
          avatar: string;
          occupation: any;
          nationality: {
            name: string;
            country_code: string;
            currency_code: string;
          };
          mailer: {
            name: string;
            email_address: string;
          };
        };
        username: string;
        account_number: string;
        redbiller_id: string;
        contacts: {
          phone_number: any;
          email_address: string;
        };
        kyc: {
          has_submitted: boolean;
          is_compliant: boolean;
          urls: {
            identity: any;
            face_shot: any;
          };
          email_address: {
            is_verified: boolean;
            code: string;
          };
        };
      };
      configuration: {
        "2fa": boolean;
        login: {
          is_locked: boolean;
          authenticator: boolean;
          failed_attempts: number;
          failed_attempt_limit: number;
        };
        password: {
          verification: {
            failed: {
              attempts: number;
              limit: number;
            };
          };
        };
        passcode: {
          is_set: boolean;
          is_disabled: boolean;
          verification: {
            failed: {
              attempts: number;
              limit: number;
            };
          };
        };
        pin: {
          is_set: boolean;
          is_disabled: boolean;
          verification: {
            failed: {
              attempts: number;
              limit: number;
            };
          };
        };
        limits: {
          max_personal_account: number;
          max_business_account: number;
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
          custom: boolean;
          default: boolean;
        };
        hide_balance: boolean;
      };
      api: {
        keys: {
          live: {
            client: string;
          };
          test: {
            client: string;
          };
        };
      };
      session: {
        id: string;
        is_pseudo: boolean;
        is_persistent: boolean;
        expiry_date: string;
        source: string;
        ip_address: string;
        date_created: string;
      };
      deactivation: {
        requested: boolean;
        date_requested: any;
        expected_deactivation_date: any;
        is_deactivated: boolean;
        date_deactivated: any;
      };
      locale: {
        product: {
          id: any;
          name: string;
        };
        source: string;
        ip_address: string;
        session_id: any;
        date_created: string;
        date_modified: string;
      };
    };
  };
};

export type SubAccount = {
  profile: {
    key: string;
    bio: {
      name: string;
      type: string;
      avatar: string;
    };
    username: any;
    account_number?: string;
  };
  contacts: {
    phone_number: any;
    email_address: string;
  };
  locale: {
    platform: string;
    source: string;
    ip_address: string;
    session_id: string;
    date_created: string;
    date_modified: string;
  };
};

export type SubAccountsResponse = {
  code: number;
  state: boolean;
  message: string;
  data: SubAccount[];
};
