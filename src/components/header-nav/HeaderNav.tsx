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
  const cardLayer_Tmp_Data = useCardLayerStore((s) => s.cardLayer_Tmp_Data);
  const setCardLayer_A_Data = useCardLayerStore((s) => s.setCardLayer_A_Data);
  const setCardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_FirstItemIndexNumber
  );
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);
  const setCardLayer_Tmp_Data = useCardLayerStore(
    (s) => s.setCardLayer_Tmp_Data
  );

  // internal calculations
  const numberOfLayerAItems = cardLayer_A_Data.length;
  const numberOfLayerBItems = cardLayer_B_Data.length;

  // actions
  const handleBadgeClick = () => {
    setCardLayer_A_Data(cardLayer_Tmp_Data);
    setCardLayer_B_Data(cardLayer_A_Data);
    setCardLayer_C_Data(cardLayer_B_Data);
    setCardLayer_Tmp_Data([]);
  };

  const handleClickLeft = () => {
    setCardLayer_A_FirstItemIndexNumber(cardLayer_A_FirstItemIndexNumber - 1);
  };

  const handleClickRight = () => {
    setCardLayer_A_FirstItemIndexNumber(cardLayer_A_FirstItemIndexNumber + 1);
  };

  return (
    <div className="header-nav">
      {cardLayer_A_FirstItemIndexNumber > 0 &&
        numberOfLayerAItems > APP_CONFIG.default.maxNumberOfCardsPerLayer && (
          <div className="nav-item-left">
            <NavBadge
              isVisible
              direction="left"
              counter={cardLayer_A_FirstItemIndexNumber}
            />
          </div>
        )}
      {numberOfLayerAItems >= APP_CONFIG.default.maxNumberOfCardsPerLayer && (
        <div className="nav-item-center">
          <GraphBadge
            counter={cardLayer_Tmp_Data.length}
            isExpanded
            nodeId=""
            onClick={handleBadgeClick}
            positionIndex={0}
          />
        </div>
      )}
      {numberOfLayerAItems -
        cardLayer_A_FirstItemIndexNumber -
        APP_CONFIG.default.maxNumberOfCardsPerLayer >
        0 && (
        <div className="nav-item-right">
          <NavBadge
            isVisible
            direction="right"
            counter={
              numberOfLayerAItems -
              cardLayer_A_FirstItemIndexNumber -
              APP_CONFIG.default.maxNumberOfCardsPerLayer
            }
          />
        </div>
      )}
    </div>
  );
}
