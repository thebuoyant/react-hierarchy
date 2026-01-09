import NavBadge from "../nav-badge/NavBadge";
import "./LayerABranch.css";

export default function LayerABranch() {
  return (
    <div className="layer-a-branch">
      <div className="nav-item-left">
        <NavBadge isVisible direction="left" />
      </div>
      <div className="branch-line">
        <div className="branch-line-item-a"></div>
        <div className="branch-line-item-b"></div>
        <div className="branch-line-item-c"></div>
        <div className="branch-line-item-d"></div>
        <div className="branch-line-item-e"></div>
        <div className="branch-line-item-f"></div>
      </div>
      <div className="nav-item-right">
        <NavBadge isVisible direction="right" />
      </div>
    </div>
  );
}
