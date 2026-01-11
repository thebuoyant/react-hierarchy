import { Chip } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BadgeClickPayload } from "../../types/graph.types";
import { APP_CONFIG } from "../../app.config";

export type GraphBadgeProps = {
  counter?: number;
  isExpanded?: boolean;
  onClick?: (payload: BadgeClickPayload) => void;
  nodeId: string;
  positionIndex: number;
};

export default function GraphBadge({
  counter = 0,
  isExpanded = false,
  onClick,
  nodeId,
  positionIndex,
}: GraphBadgeProps) {
  const handleExpansionClick = () => {
    onClick?.({
      expanded: !isExpanded,
      counter,
      nodeId,
      positionIndex,
    });
  };

  return (
    <Chip
      className="graph-badge"
      label={counter}
      onClick={handleExpansionClick}
      onDelete={handleExpansionClick}
      deleteIcon={isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      size="small"
      style={{
        backgroundColor: isExpanded
          ? APP_CONFIG.layout.badge.activeHierarchyBackgroundColor
          : APP_CONFIG.layout.badge.defaultBackgroundColor,
        color: isExpanded
          ? APP_CONFIG.layout.badge.activeHierarchyColor
          : APP_CONFIG.layout.badge.defaultColor,
      }}
    />
  );
}
