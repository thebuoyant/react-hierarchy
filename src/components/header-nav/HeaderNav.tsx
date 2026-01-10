import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import GraphBadge from "../graph-badge/GraphBadge";
import NavBadge from "../nav-badge/NavBadge";
import "./HeaderNav.css";
import { BadgeClickPayload } from "../../types/graph.types";

export default function HeaderNav() {
  // card layer store
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );

  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_C_Data = useCardLayerStore((s) => s.cardLayer_C_Data);

  // Used as a simple "one-step-back" buffer when we drill down from Layer-C.
  const cardLayer_Tmp_Data = useCardLayerStore((s) => s.cardLayer_Tmp_Data);

  const setCardLayer_A_Data = useCardLayerStore((s) => s.setCardLayer_A_Data);
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);
  const setCardLayer_Tmp_Data = useCardLayerStore(
    (s) => s.setCardLayer_Tmp_Data
  );

  const setCardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_FirstItemIndexNumber
  );
  const setCardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_FirstItemIndexNumber
  );
  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );

  // internal calculations
  const numberOfLayerAItems = cardLayer_A_Data.length;
  const canGoBackOneLevel = cardLayer_Tmp_Data.length > 0;

  // actions
  const handleBackClick = (_payload: BadgeClickPayload) => {
    if (!canGoBackOneLevel) return;

    // Reverse the drill-down shift:
    //   C -> B, B -> A, A -> TMP
    setCardLayer_C_Data(cardLayer_B_Data);
    setCardLayer_B_Data(cardLayer_A_Data);
    setCardLayer_A_Data(cardLayer_Tmp_Data);
    setCardLayer_Tmp_Data([]);

    // Reset selections / windows
    setCardLayer_A_FirstItemIndexNumber(0);
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);
  };

  return (
    <div className="header-nav">
      {cardLayer_A_FirstItemIndexNumber > 0 &&
        numberOfLayerAItems > APP_CONFIG.default.maxNumberOfCardsPerLayer && (
          <div className="nav-item-left">
            <NavBadge isVisible direction="left" />
          </div>
        )}

      {canGoBackOneLevel && (
        <div className="nav-item-center">
          <GraphBadge
            // Counter is not important here, but we keep the UI consistent
            counter={0}
            isExpanded
            nodeId="__back__"
            onClick={handleBackClick}
            positionIndex={0}
          />
        </div>
      )}

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
