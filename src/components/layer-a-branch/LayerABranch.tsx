import { APP_CONFIG } from "../../app.config";
import { useLayoutStore } from "../../store/layoutStore";
import NavBadge from "../nav-badge/NavBadge";
import "./LayerABranch.css";

export default function LayerABranch() {
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);

  const branchLineItemWidth = 2 * cardSpace + cardWidth;
  const branchLineItemColor = APP_CONFIG.layout.branch.lineColor;

  return (
    <div className="layer-a-branch">
      <div className="nav-item-left">
        <NavBadge isVisible direction="left" />
      </div>
      <div className="branch-line">
        <div
          className="branch-line-item-a"
          style={{
            width: branchLineItemWidth,
            backgroundColor: branchLineItemColor,
          }}
        ></div>
        <div
          className="branch-line-item-b"
          style={{
            width: branchLineItemWidth,
            backgroundColor: branchLineItemColor,
          }}
        ></div>
        <div
          className="branch-line-item-c"
          style={{
            width: branchLineItemWidth,
            backgroundColor: branchLineItemColor,
          }}
        ></div>
        <div
          className="branch-line-item-d"
          style={{
            width: branchLineItemWidth,
            backgroundColor: branchLineItemColor,
          }}
        ></div>
        <div
          className="branch-line-item-e"
          style={{
            width: branchLineItemWidth,
            backgroundColor: branchLineItemColor,
          }}
        ></div>
        <div
          className="branch-line-item-f"
          style={{
            width: branchLineItemWidth,
            backgroundColor: branchLineItemColor,
          }}
        ></div>
      </div>
      <div className="nav-item-right">
        <NavBadge isVisible direction="right" />
      </div>
    </div>
  );
}
