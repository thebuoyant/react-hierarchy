/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
import "./GraphCard.css";
import { HierarchyNode } from "../../types/data.type";
import { Avatar, Typography } from "@mui/material";
import { useLayoutStore } from "../../store/layoutStore";

export type GraphCardProps = {
  node?: HierarchyNode;
  onHeaderReferClick?: ({}: any) => void;
  isActive?: boolean;
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
  showBadge = true,
  showChildren,
  onBadgeClick = () => {},
  branchGraphHeight,
  positionIndex,
  content = <div>Content</div>,
  showParent = true,
}: GraphCardProps) {
  const cardHeight = useLayoutStore((s) => s.cardHeight);
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);
  const cardHeaderBackgroundColor = useLayoutStore(
    (s) => s.cardHeaderBackgroundColor
  );

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
      ></div>
      <div
        className="card-content-wrapper"
        style={{ width: cardWidth, overflow: "hidden" }}
      >
        <div
          className="content-header"
          style={{ backgroundColor: cardHeaderBackgroundColor }}
        >
          <div className="avatar-section">
            <Avatar
              className="avatar-image"
              alt="avatar"
              src={node.avatarUrl}
            />
          </div>
          <div className="title-section">
            <Typography
              className="header-title-typo"
              variant="body1"
              gutterBottom
            >
              {node.headerTitle}
            </Typography>
            <Typography className="header-sub-title-typo" variant="subtitle2">
              {node.headerSubTitle}
            </Typography>
          </div>
        </div>
        <div className="content-main">{content}</div>
      </div>
      <div
        className="space-right"
        style={{ width: cardSpace, overflow: "hidden" }}
      ></div>
    </div>
  );
}
