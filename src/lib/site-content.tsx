import { createContext, useContext, type ReactNode } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { defaultContent } from "@/content/site";
import { getSiteContent } from "./site-content.functions";

export const siteContentOptions = queryOptions({ queryKey: ["site-content"], queryFn: () => getSiteContent(), staleTime: 60000 });
const ContentContext = createContext(defaultContent);
export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { data } = useSuspenseQuery(siteContentOptions);
  return <ContentContext.Provider value={data}>{children}</ContentContext.Provider>;
}
export const useSiteContent = () => useContext(ContentContext);