export const COLLECTION_PATHS = {
  users: "users",
  paths: "paths",
  kra: "kra",
  kc: "kc",
  milestones: "milestones",
} as const;

export type CollectionKey = keyof typeof COLLECTION_PATHS;
