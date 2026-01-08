import { HierarchyNode } from "../types/data.type";

/**
 * Result interface for findNodeAndMetaData
 */
interface TResult {
  node: HierarchyNode;
  childCount: number;
  indexInParent: number | null;
}

/**
 * Recursively searches for a node by id.
 * Returns the node if found, otherwise null.
 */
export function findNodeById(
  node: HierarchyNode,
  targetId: string
): HierarchyNode | null {
  if (node.id === targetId) {
    return node;
  }

  for (const child of node.children) {
    const result = findNodeById(child, targetId);
    if (result) return result;
  }

  return null;
}

/**
 * Finds the first node with the given id
 * and returns its children ONLY if children exist.
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
 * Returns the children of the first element in the array
 * ONLY if it exists and has children.
 *
 * Note: With `noUncheckedIndexedAccess`, `nodes[0]` is `HierarchyNode | undefined`,
 * so we must guard it explicitly.
 */
export function getChildrenOfFirstEntry(
  nodes: HierarchyNode[]
): HierarchyNode[] {
  const firstNode = nodes[0]; // can be undefined in TS config with noUncheckedIndexedAccess
  if (!firstNode) return [];

  if (firstNode.children.length === 0) return [];
  return firstNode.children;
}

/**
 * Returns the children of the FIRST node in the list
 * that actually has children.
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
 * Internal helper:
 * Searches a subtree for the first node that has children.
 */
function findFirstNodeWithChildrenInSubtree(
  node: HierarchyNode
): HierarchyNode | null {
  if (node.children.length > 0) {
    return node;
  }

  for (const child of node.children) {
    const found = findFirstNodeWithChildrenInSubtree(child);
    if (found) return found;
  }

  return null;
}

/**
 * Finds the first descendant (below targetId)
 * that has children.
 */
export function findFirstDescendantNodeWithChildrenById(
  root: HierarchyNode,
  targetId: string
): HierarchyNode | null {
  const targetNode = findNodeById(root, targetId);
  if (!targetNode) return null;

  for (const child of targetNode.children) {
    const found = findFirstNodeWithChildrenInSubtree(child);
    if (found) return found;
  }

  return null;
}

/**
 * Finds a node in a list/tree and returns metadata.
 */
export function findNodeAndMetaData(
  nodes: HierarchyNode[],
  nodeId: string,
  parentChildren: HierarchyNode[] | null = null
): TResult | null {
  for (let i = 0; i < nodes.length; i++) {
    // With noUncheckedIndexedAccess, nodes[i] can be undefined -> guard it
    const node = nodes[i];
    if (!node) continue;

    if (node.id === nodeId) {
      return {
        node,
        childCount: node.children.length,
        indexInParent: parentChildren ? i : null,
      };
    }

    const found = findNodeAndMetaData(node.children, nodeId, node.children);
    if (found) return found;
  }

  return null;
}

/**
 * Finds a node (including its children) by id.
 */
export function findNodeAndChildren(
  nodes: HierarchyNode[],
  nodeId: string
): HierarchyNode | null {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node;
    }

    const found = findNodeAndChildren(node.children, nodeId);
    if (found) return found;
  }

  return null;
}

/**
 * Finds the parent of a node by id.
 */
export function findParentNode(
  nodes: HierarchyNode[],
  nodeId: string
): HierarchyNode | null {
  function helper(
    currentNodes: HierarchyNode[],
    parent: HierarchyNode | null
  ): HierarchyNode | null {
    for (const node of currentNodes) {
      if (node.id === nodeId) {
        return parent;
      }

      const found = helper(node.children, node);
      if (found) return found;
    }

    return null;
  }

  return helper(nodes, null);
}

/**
 * Calculates the depth of the subtree starting at nodeId.
 *
 * Depth rules:
 * - no children => 0
 * - otherwise => 1 + deepest child
 */
export function getGraphDepth(nodes: HierarchyNode[], nodeId: string): number {
  function calculateDepth(node: HierarchyNode | null): number {
    if (!node) return 0;
    if (node.children.length === 0) return 0;

    return 1 + Math.max(...node.children.map((child) => calculateDepth(child)));
  }

  const targetNode = findNodeAndChildren(nodes, nodeId);
  return calculateDepth(targetNode);
}

/**
 * Returns the first node that has children.
 * Safe for strict mode + noUncheckedIndexedAccess.
 */
export function getFirstFilledNodeChildrenItem(
  nodes: HierarchyNode[]
): HierarchyNode | undefined {
  const node = nodes.find((n) => n.children.length > 0);
  return node; // find already returns HierarchyNode | undefined
}

/**
 * Extracts nodes for your current UI structure.
 *
 * Note: With `noUncheckedIndexedAccess`, `root.children[0]` can be undefined.
 * We therefore guard the first child explicitly.
 */
export function extractNodesForLevels(root: HierarchyNode): {
  arrayLevelA: HierarchyNode[];
  arrayLevelB: HierarchyNode[];
  arrayLevelC: HierarchyNode[];
} {
  const arrayLevelA: HierarchyNode[] = [root];
  const arrayLevelB: HierarchyNode[] = root.children;

  const firstChild = root.children[0]; // HierarchyNode | undefined
  const arrayLevelC: HierarchyNode[] = firstChild ? firstChild.children : [];

  return {
    arrayLevelA,
    arrayLevelB,
    arrayLevelC,
  };
}
