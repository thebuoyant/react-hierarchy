import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import GraphBadge from "../graph-badge/GraphBadge";
import NavBadge from "../nav-badge/NavBadge";
import "./HeaderNav.css";

export default function HeaderNav() {
  // card layer store
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );

  // internal calculations
  const numberOfLayerAItems = cardLayer_A_Data.length;

  return (
    <div className="header-nav">
      {cardLayer_A_FirstItemIndexNumber > 0 &&
        numberOfLayerAItems > APP_CONFIG.default.maxNumberOfCardsPerLayer && (
          <div className="nav-item-left">
            <NavBadge isVisible direction="left" />
          </div>
        )}
      <div className="nav-item-center">
        <GraphBadge
          counter={0}
          isExpanded
          nodeId=""
          onClick={() => {}}
          positionIndex={0}
        />
      </div>
      {numberOfLayerAItems -
        cardLayer_A_FirstItemIndexNumber -
        APP_CONFIG.default.maxNumberOfCardsPerLayer >
        0 && (
        <div className="nav-item-right">
          <NavBadge isVisible direction="right" />
        </div>
      )}
    </div>
  );
}
