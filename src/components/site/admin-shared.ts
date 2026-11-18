export const adminInput = "w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
export const readable = (value: string) => value.replaceAll("_", " ");
export const singaporeDate = (value: string) => new Date(value).toLocaleString("en-SG", { timeZone: "Asia/Singapore" });