import { Chip } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BadgeClickPayload } from "../../types/graph.types";

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
    />
  );
}
