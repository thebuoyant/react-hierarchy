import { HierarchyNode } from "../types/data.type";

interface TResult {
  node: HierarchyNode;
  childCount: number;
  indexInParent: number | null;
}

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

export function findNodeAndMetaData(
  nodes: HierarchyNode[],
  nodeId: string,
  parentChildren: HierarchyNode[] | null = null
): TResult | null {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.id === nodeId) {
      return {
        node,
        childCount: node.children ? node.children.length : 0,
        indexInParent: parentChildren ? i : null,
      };
    }

    if (node.children) {
      const found = findNodeAndMetaData(node.children, nodeId, node.children);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function findNodeAndChildren(
  nodes: HierarchyNode[],
  nodeId: string
): HierarchyNode | null {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children) {
      const found = findNodeAndChildren(node.children, nodeId);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function findParentNode(
  nodes: HierarchyNode[],
  nodeId: string
): HierarchyNode | null {
  function helper(
    nodes: HierarchyNode[],
    nodeId: string,
    parent: HierarchyNode | null
  ): HierarchyNode | null {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return parent;
      }
      if (node.children) {
        const foundParent = helper(node.children, nodeId, node);
        if (foundParent) {
          return foundParent;
        }
      }
    }
    return null;
  }

  return helper(nodes, nodeId, null);
}

export const findParentNodeItem = (
  node: HierarchyNode,
  targetId: string,
  parent: HierarchyNode | null = null
): HierarchyNode | null => {
  for (const child of node.children) {
    if (child.id === targetId) {
      // Return parent directly if found
      return parent;
    }
    const found = findParentNodeItem(child, targetId, node);
    if (found) return found;
  }

  return null;
};

export function getGraphDepth(nodes: HierarchyNode[], nodeId: string): number {
  function findDepth(node: HierarchyNode | null): number {
    // No children = depth 0
    if (!node || !node.children || node.children.length === 0) return 0;

    // Recursively calculate the maximum depth of the children and add +1
    return 1 + Math.max(...node.children.map(findDepth));
  }

  // First find the node
  const targetNode = findNodeAndChildren(nodes, nodeId);
  return findDepth(targetNode);
}

export function getFirstFilledNodeChildrenItem(nodes: HierarchyNode[]) {
  return nodes.find((node: HierarchyNode) => node.children.length > 0);
}

export function extractNodesForLevels(root: HierarchyNode) {
  // Root node as the only element
  const arrayLevelA = [root];
  // All direct children of the root node
  const arrayLevelB = root.children || [];
  // Children of the first child element of the root node
  const arrayLevelC = root.children.length > 0 ? root.children[0].children : [];

  return { arrayLevelA, arrayLevelB, arrayLevelC };
}
