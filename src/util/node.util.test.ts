import { describe, it, expect } from "vitest";

import { MOCK_DATA } from "../_mock/mock-data";
import type { HierarchyNode } from "../types/data.type";

import {
  extractNodesForLevels,
  findFirstDescendantNodeWithChildrenById,
  findFirstNodeWithChildrenById,
  findNodeAndChildren,
  findNodeAndMetaData,
  findNodeById,
  findParentNode,
  getChildrenByNodeId,
  getChildrenOfFirstEntry,
  getChildrenOfFirstNodeWithChildren,
  getFirstFilledNodeChildrenItem,
  getGraphDepth,
} from "./node.util";

/**
 * Small helper to avoid accidental mutations between tests.
 * (Deep clone using JSON is totally fine for our mock structure.)
 */
function createRoot(): HierarchyNode {
  return JSON.parse(JSON.stringify(MOCK_DATA)) as HierarchyNode;
}

describe("node.util.ts", () => {
  it("findNodeById: Should find a node by id (deep)", () => {
    const root = createRoot();

    const node = findNodeById(root, "NodeAAB");
    expect(node).not.toBeNull();
    expect(node?.id).toBe("NodeAAB");
  });

  it("findNodeById: Should return null when node does not exist", () => {
    const root = createRoot();

    const node = findNodeById(root, "DOES_NOT_EXIST");
    expect(node).toBeNull();
  });

  it("findFirstNodeWithChildrenById: Should return children for a node that has children", () => {
    const root = createRoot();

    const children = findFirstNodeWithChildrenById(root, "NodeAA");
    expect(children).not.toBeNull();
    expect(children?.length).toBeGreaterThan(0);

    const childIds = (children ?? []).map((c) => c.id);
    expect(childIds).toContain("NodeAAB");
  });

  it("findFirstNodeWithChildrenById: Should return null when node has no children", () => {
    const root = createRoot();

    const children = findFirstNodeWithChildrenById(root, "NodeAAA"); // leaf in mock
    expect(children).toBeNull();
  });

  it("getChildrenOfFirstEntry: Should return [] for empty input", () => {
    expect(getChildrenOfFirstEntry([])).toEqual([]);
  });

  it("getChildrenOfFirstEntry: Should return children of first node if present", () => {
    const root = createRoot();

    const children = getChildrenOfFirstEntry([root]);
    expect(children.length).toBe(root.children.length);
    expect(children.map((n) => n.id)).toContain("NodeAA");
  });

  it("getChildrenOfFirstNodeWithChildren: Should return children of the first node that has children", () => {
    const root = createRoot();

    // Create a leaf node (no children) before the root
    const leaf: HierarchyNode = {
      ...(JSON.parse(JSON.stringify(root.children[0])) as HierarchyNode),
      id: "LEAF",
      children: [],
    };

    const children = getChildrenOfFirstNodeWithChildren([leaf, root]);
    expect(children.length).toBe(root.children.length);
    expect(children.map((n) => n.id)).toContain("NodeAB");
  });

  it("findFirstDescendantNodeWithChildrenById: Should find first descendant node that has children", () => {
    const root = createRoot();

    // Under NodeAA, NodeAAA is a leaf, NodeAAB has children => Should return NodeAAB
    const found = findFirstDescendantNodeWithChildrenById(root, "NodeAA");
    expect(found).not.toBeNull();
    expect(found?.id).toBe("NodeAAB");
  });

  it("findFirstDescendantNodeWithChildrenById: Should return null if no descendant has children", () => {
    const root = createRoot();

    // Under NodeAAB, children are leaves in mock => no descendant with children
    const found = findFirstDescendantNodeWithChildrenById(root, "NodeAAB");
    expect(found).toBeNull();
  });

  it("findNodeAndMetaData: Should return node + childCount + indexInParent", () => {
    const root = createRoot();

    const result = findNodeAndMetaData([root], "NodeAA");
    expect(result).not.toBeNull();

    expect(result?.node.id).toBe("NodeAA");
    expect(result?.childCount).toBeGreaterThan(0);

    // NodeAA is the first child of NodeA in the mock => index 0
    expect(result?.indexInParent).toBe(0);
  });

  it("findNodeAndChildren: Should return a node including its children", () => {
    const root = createRoot();

    const node = findNodeAndChildren([root], "NodeAAB");
    expect(node).not.toBeNull();
    expect(node?.id).toBe("NodeAAB");
    expect(node?.children.length).toBeGreaterThan(0);
  });

  it("findParentNode: Should return the parent node", () => {
    const root = createRoot();

    const parent = findParentNode([root], "NodeAAB");
    expect(parent).not.toBeNull();
    expect(parent?.id).toBe("NodeAA");
  });

  it("findParentNode: Should return null for root node", () => {
    const root = createRoot();

    const parent = findParentNode([root], "NodeA");
    expect(parent).toBeNull();
  });

  it("getGraphDepth: Should calculate depth correctly", () => {
    const root = createRoot();

    // NodeAAB has children, but those are leaves => depth Should be 1
    const depthAAB = getGraphDepth([root], "NodeAAB");
    expect(depthAAB).toBe(1);

    // Leaf node => depth 0
    const depthAAA = getGraphDepth([root], "NodeAAA");
    expect(depthAAA).toBe(0);
  });

  it("getFirstFilledNodeChildrenItem: Should return first node that has children", () => {
    const root = createRoot();

    // root definitely has children
    const found = getFirstFilledNodeChildrenItem([root]);
    expect(found).toBeDefined();
    expect(found?.id).toBe("NodeA");
  });

  it("extractNodesForLevels: Should extract A/B/C arrays", () => {
    const root = createRoot();

    const { arrayLevelA, arrayLevelB, arrayLevelC } =
      extractNodesForLevels(root);

    // Level A: Should be [root]
    expect(arrayLevelA.length).toBe(1);
    expect(arrayLevelA[0]?.id).toBe("NodeA");

    // Level B: direct children of root
    expect(arrayLevelB.length).toBe(root.children.length);

    // Level C: children of first child (if any)
    const firstChild = root.children[0];
    if (!firstChild) {
      expect(arrayLevelC).toEqual([]);
    } else {
      expect(arrayLevelC.length).toBe(firstChild.children.length);
    }
  });

  it("getChildrenByNodeId: Should return children for an existing node", () => {
    const root = createRoot();

    const children = getChildrenByNodeId(root, "NodeAA");

    expect(children.length).toBeGreaterThan(0);
    const ids = children.map((c) => c.id);
    expect(ids).toContain("NodeAAA");
    expect(ids).toContain("NodeAAB");
  });

  it("getChildrenByNodeId: Should return [] for a leaf node", () => {
    const root = createRoot();

    // NodeAAA is a leaf in mock data
    const children = getChildrenByNodeId(root, "NodeAAA");

    expect(children).toEqual([]);
  });

  it("getChildrenByNodeId: Should return [] when node does not exist", () => {
    const root = createRoot();

    const children = getChildrenByNodeId(root, "DOES_NOT_EXIST");

    expect(children).toEqual([]);
  });
});
