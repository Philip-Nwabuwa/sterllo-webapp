export const generateRequestId = (): string => {
  return crypto.randomUUID().slice(0, 16).toLowerCase();
};
