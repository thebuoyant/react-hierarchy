import * as React from "react";
import "./GraphCard.css";
import type { HierarchyNode } from "../../types/data.type";
import { Avatar, Typography } from "@mui/material";
import { useLayoutStore } from "../../store/layoutStore";
import GraphBadge from "../graph-badge/GraphBadge";
import { BadgeClickPayload } from "../../types/graph.types";

export type GraphCardProps = {
  node: HierarchyNode;

  /**
   * Whether the expand/collapse badge should be shown.
   * In your UI: only show it when a node has children.
   */
  showBadge: boolean;

  /**
   * Whether this node is currently "expanded" / selected (vertical navigation).
   * Used to render the correct arrow icon in the GraphBadge.
   */
  showChildren: boolean;

  onBadgeClick?: (payload: BadgeClickPayload) => void;

  /**
   * Index of this card within its layer data array.
   * This is important for navigation and "selected" logic.
   */
  positionIndex: number;

  content: React.ReactNode;

  /**
   * Visual states (UX helpers)
   */
  isSelected?: boolean;
  isDimmed?: boolean;
  isConnected?: boolean;
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
    showAvatar: true,
    layout: {
      headerBackgroundColor: "#123456",
      headerTitleColor: "#ffffff",
      headerSubtitleColor: "#cccccc",
    },
    children: [],
  },
  showBadge = true,
  showChildren,
  onBadgeClick,
  positionIndex,
  content = <div>Content</div>,
  isSelected = false,
  isDimmed = false,
  isConnected = false,
}: GraphCardProps) {
  const cardHeight = useLayoutStore((s) => s.cardHeight);
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);

  const totalWidth = 2 * cardSpace + cardWidth;
  const showAvatar = node.showAvatar;

  const handleBadgeClick = (payload: BadgeClickPayload) => {
    onBadgeClick?.(payload);
  };

  const className = [
    "graph-card",
    isSelected ? "graph-card--selected" : "",
    isDimmed ? "graph-card--dimmed" : "",
    isConnected ? "graph-card--connected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      style={{
        width: totalWidth,
        height: cardHeight,
      }}
      data-nodeid={node.id}
      data-selected={isSelected ? "true" : "false"}
    >
      <div
        className="space-left"
        style={{ width: cardSpace, overflow: "hidden" }}
      />

      <div
        className="card-content-wrapper"
        style={{ width: cardWidth, overflow: "hidden" }}
      >
        <div
          className="content-header"
          style={{ backgroundColor: node.layout.headerBackgroundColor }}
        >
          {showAvatar && (
            <div className="avatar-section">
              <Avatar
                className="avatar-image"
                alt="avatar"
                src={node.avatarUrl}
              />
            </div>
          )}

          <div className="title-section">
            <Typography
              className="header-title-typo"
              variant="body1"
              gutterBottom
              style={{ color: node.layout.headerTitleColor }}
            >
              {node.headerTitle}
            </Typography>

            <Typography
              className="header-sub-title-typo"
              variant="subtitle2"
              style={{ color: node.layout.headerSubtitleColor }}
            >
              {node.headerSubTitle}
            </Typography>
          </div>
        </div>

        <div className="content-main">{content}</div>
      </div>

      <div
        className="space-right"
        style={{ width: cardSpace, overflow: "hidden" }}
      />

      {showBadge && (
        <div className="badge-section">
          <GraphBadge
            nodeId={node.id}
            positionIndex={positionIndex}
            counter={node.children.length}
            isExpanded={showChildren}
            onClick={handleBadgeClick}
          />
        </div>
      )}
    </div>
  );
}
