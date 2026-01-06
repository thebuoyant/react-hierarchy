/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
import "./GraphCard.css";
import { HierarchyNode } from "../../types/data.type";
import { CARD_DEFAULT_DIMENSION } from "../../store/layoutStore";

export type GraphCardProps = {
  node?: HierarchyNode;
  onHeaderReferClick?: ({}: any) => void;
  isActive?: boolean;
  cardWidth: number;
  cardHeight: number;
  cardSpace: number;
  branchGraphHeight: number;
  showBadge?: boolean;
  showChildren: boolean;
  onBadgeClick?: ({}: any) => void;
  positionIndex: number;
  content: React.ReactNode;
  showParent?: boolean;
};

export default function GraphCard({
  node = {
    id: "NodeA",
    headerTitle: "Node-A",
    headerSubTitle: "Node-A-Subtitle",
    content: {
      valueA: "Node-A-Value-A",
      valueB: "Node-A-Value-B",
    },
    contentType: "person",
    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
    children: [],
  },
  onHeaderReferClick = () => {},
  isActive = false,
  cardHeight = CARD_DEFAULT_DIMENSION.cardHeight,
  cardWidth = CARD_DEFAULT_DIMENSION.cardWidth,
  cardSpace = CARD_DEFAULT_DIMENSION.cardSpace,
  showBadge = true,
  showChildren,
  onBadgeClick = () => {},
  branchGraphHeight,
  positionIndex,
  content = null,
  showParent = true,
}: GraphCardProps) {
  const totalWidth = 2 * cardSpace + cardWidth;
  console.log("totalWidth", totalWidth);

  const handleOnSelectClick = () => {
    if (onHeaderReferClick) {
      onHeaderReferClick({ node });
    }
  };

  return (
    <div
      className="graph-card"
      style={{
        width: totalWidth,
        height: cardHeight,
      }}
    >
      <div
        className="space-left"
        style={{ width: cardSpace, overflow: "hidden" }}
      >
        l
      </div>
      <div className="content" style={{ width: cardWidth, overflow: "hidden" }}>
        c
      </div>
      <div
        className="space-right"
        style={{ width: cardSpace, overflow: "hidden" }}
      >
        r
      </div>
    </div>
  );
}
