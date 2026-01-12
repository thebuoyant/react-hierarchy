import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { useLayoutStore } from "../../store/layoutStore";
import BranchLine from "../branch-line/BranchLine";
import NavBadge from "../nav-badge/NavBadge";
import "./LayerBBranch.css";

export default function LayerBBranch() {
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);

  // card layer store
  const cardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_FirstItemIndexNumber
  );
  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );
  const cardLayer_C_Data = useCardLayerStore((s) => s.cardLayer_C_Data);

  // internal calculations
  const branchLineItemWidth = 2 * cardSpace + cardWidth;
  const branchLineItemColor = APP_CONFIG.layout.branch.lineColor;
  const numberOfLayerCItems = cardLayer_C_Data.length;

  // actions
  const handleClickLeft = () => {
    setCardLayer_C_FirstItemIndexNumber(cardLayer_C_FirstItemIndexNumber - 1);
  };

  const handleClickRight = () => {
    setCardLayer_C_FirstItemIndexNumber(cardLayer_C_FirstItemIndexNumber + 1);
  };

  return (
    <div className="layer-b-branch">
      {cardLayer_C_FirstItemIndexNumber > 0 &&
        numberOfLayerCItems > APP_CONFIG.default.maxNumberOfCardsPerLayer && (
          <div className="nav-item-left">
            <NavBadge
              isVisible
              direction="left"
              onClick={handleClickLeft}
              counter={cardLayer_C_FirstItemIndexNumber}
            />
          </div>
        )}
      <div className="branch-line">
        <BranchLine
          numberOfNodes={cardLayer_C_Data.length}
          indexNumber={cardLayer_C_FirstItemIndexNumber}
        />
      </div>
      {numberOfLayerCItems -
        cardLayer_C_FirstItemIndexNumber -
        APP_CONFIG.default.maxNumberOfCardsPerLayer >
        0 && (
        <div className="nav-item-right">
          <NavBadge
            isVisible
            direction="right"
            onClick={handleClickRight}
            counter={
              numberOfLayerCItems -
              cardLayer_C_FirstItemIndexNumber -
              APP_CONFIG.default.maxNumberOfCardsPerLayer
            }
          />
        </div>
      )}
    </div>
  );
}
