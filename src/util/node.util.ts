import { HierarchyNode } from "../types/data.type";

export function findFirstNodeWithChildrenById(
  node: HierarchyNode,
  targetId: string
): HierarchyNode[] | null {
  // Node successfully found
  if (node.id === targetId && node.children.length > 0) {
    return node.children;
  }

  // Recursively go through all children
  for (const child of node.children) {
    const result = findFirstNodeWithChildrenById(child, targetId);
    if (result) {
      return result;
    }
  }

  return null;
}
