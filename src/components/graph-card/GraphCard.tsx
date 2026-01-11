import * as React from "react";
import "./GraphCard.css";
import type { HierarchyNode } from "../../types/data.type";
import { Avatar, Typography } from "@mui/material";
import { useLayoutStore } from "../../store/layoutStore";
import GraphBadge from "../graph-badge/GraphBadge";
import { APP_CONFIG } from "../../app.config";
import { BadgeClickPayload } from "../../types/graph.types";

export type GraphCardProps = {
  node: HierarchyNode;
  showBadge: boolean;
  onBadgeClick?: (payload: BadgeClickPayload) => void;
  positionIndex: number;
  content: React.ReactNode;
  showChildConnection: boolean;
  showParentConnection: boolean;
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
  showChildConnection,
  onBadgeClick,
  positionIndex,
  content = <div>Content</div>,
  showParentConnection = true,
}: GraphCardProps) {
  const cardHeight = useLayoutStore((s) => s.cardHeight);
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);
  const branchHeight = useLayoutStore((s) => s.branchHeight);

  const totalWidth = 2 * cardSpace + cardWidth;
  const showAvatar = node.showAvatar;

  const handleBadgeClick = (payload: BadgeClickPayload) => {
    onBadgeClick?.(payload);
  };

  return (
    <div
      className="graph-card"
      style={{
        width: totalWidth,
        height: cardHeight,
      }}
    >
      {showParentConnection && (
        <div
          className="parent-line"
          style={{
            height: `${branchHeight / 2}px`,
            top: `-${branchHeight / 2}px`,
            backgroundColor: APP_CONFIG.layout.branch.lineColor,
          }}
        />
      )}

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
            isExpanded={showChildConnection}
            onClick={handleBadgeClick}
          />
        </div>
      )}

      {showChildConnection && (
        <div
          className="children-line"
          style={{
            height: `${branchHeight / 2}px`,
            bottom: `-${branchHeight / 2}px`,
            backgroundColor: APP_CONFIG.layout.branch.lineColor,
          }}
        />
      )}
    </div>
  );
}
