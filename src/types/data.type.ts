export type NodeContent = Record<string, string>;

export type HierarchyNode = {
  id: string;
  headerTitle: string;
  headerSubTitle?: string;
  content: NodeContent;
  contentType: "person" | "team" | "org" | string;
  avatarUrl?: string;
  children: HierarchyNode[];
};
