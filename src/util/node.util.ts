import { HierarchyNode } from "../types/data.type";

/**
 * Finds the first node with the given id whose children.length > 0
 * and returns its children array.
 */
export function findFirstNodeWithChildrenById(
  node: HierarchyNode,
  targetId: string
): HierarchyNode[] | null {
  if (node.id === targetId && node.children.length > 0) {
    return node.children;
  }

  for (const child of node.children) {
    const result = findFirstNodeWithChildrenById(child, targetId);
    if (result) return result;
  }

  return null;
}

/**
 * Layer helper:
 * Returns the children of the FIRST entry in the list (nodes[0]),
 * if that entry has children; otherwise [].
 *
 * Strict-mode safe (no TS18048).
 */
export function getChildrenOfFirstEntry(
  nodes: HierarchyNode[]
): HierarchyNode[] {
  const firstNode = nodes[0];
  if (!firstNode) return [];
  return firstNode.children.length > 0 ? firstNode.children : [];
}

/**
 * Layer helper (usually better):
 * Returns the children of the FIRST node in the list whose children.length > 0.
 * If none, returns [].
 */
export function getChildrenOfFirstNodeWithChildren(
  nodes: HierarchyNode[]
): HierarchyNode[] {
  for (const node of nodes) {
    if (node.children.length > 0) {
      return node.children;
    }
  }
  return [];
}

/**
 * Finds a node by id anywhere in the tree.
 */
export function findNodeById(
  node: HierarchyNode,
  targetId: string
): HierarchyNode | null {
  if (node.id === targetId) return node;

  for (const child of node.children) {
    const result = findNodeById(child, targetId);
    if (result) return result;
  }

  return null;
}

/**
 * Finds (below targetId) the first descendant NODE (child/child-child/...)
 * where children.length > 0 and returns that NODE.
 *
 * Note: "descendant" means the target node itself is NOT considered.
 */
export function findFirstDescendantNodeWithChildrenById(
  root: HierarchyNode,
  targetId: string
): HierarchyNode | null {
  const targetNode = findNodeById(root, targetId);
  if (!targetNode) return null;

  // Search ONLY below the target node (descendants)
  for (const child of targetNode.children) {
    const found = findFirstNodeWithChildrenInSubtree(child);
    if (found) return found;
  }

  return null;
}

/**
 * DFS: Returns the first node in this subtree with children.length > 0.
 */
function findFirstNodeWithChildrenInSubtree(
  node: HierarchyNode
): HierarchyNode | null {
  if (node.children.length > 0) return node;

  for (const child of node.children) {
    const found = findFirstNodeWithChildrenInSubtree(child);
    if (found) return found;
  }

  return null;
}
