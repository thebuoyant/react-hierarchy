import GraphBadge from "../graph-badge/GraphBadge";
import NavBadge from "../nav-badge/NavBadge";
import "./HeaderNav.css";

export default function HeaderNav() {
  return (
    <div className="header-nav">
      <div className="nav-item-left">
        <NavBadge isVisible direction="left" />
      </div>
      <div className="nav-item-center">
        <GraphBadge
          counter={0}
          isExpanded
          nodeId=""
          onClick={() => {}}
          positionIndex={0}
        />
      </div>
      <div className="nav-item-right">
        <NavBadge isVisible direction="right" />
      </div>
    </div>
  );
}
