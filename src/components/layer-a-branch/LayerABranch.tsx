import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { useLayoutStore } from "../../store/layoutStore";
import NavBadge from "../nav-badge/NavBadge";
import "./LayerABranch.css";

export default function LayerABranch() {
  // layout store
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);

  // card layer store
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );
  const setCardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_FirstItemIndexNumber
  );
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);

  // internal calculations
  const branchLineItemWidth = 2 * cardSpace + cardWidth;
  const branchLineItemColor = APP_CONFIG.layout.branch.lineColor;
  const numberOfLayerBItems = cardLayer_B_Data.length;

  // actions
  const handleClickLeft = () => {
    setCardLayer_B_FirstItemIndexNumber(cardLayer_B_FirstItemIndexNumber - 1);
  };

  const handleClickRight = () => {
    setCardLayer_B_FirstItemIndexNumber(cardLayer_B_FirstItemIndexNumber + 1);
  };

  return (
    <div className="layer-a-branch">
      {cardLayer_B_FirstItemIndexNumber > 0 &&
        numberOfLayerBItems > APP_CONFIG.default.maxNumberOfCardsPerLayer && (
          <div className="nav-item-left">
            <NavBadge
              isVisible
              direction="left"
              onClick={handleClickLeft}
              counter={cardLayer_B_FirstItemIndexNumber}
            />
          </div>
        )}
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
      {numberOfLayerBItems -
        cardLayer_B_FirstItemIndexNumber -
        APP_CONFIG.default.maxNumberOfCardsPerLayer >
        0 && (
        <div className="nav-item-right">
          <NavBadge
            isVisible
            direction="right"
            onClick={handleClickRight}
            counter={
              numberOfLayerBItems -
              cardLayer_B_FirstItemIndexNumber -
              APP_CONFIG.default.maxNumberOfCardsPerLayer
            }
          />
        </div>
      )}
    </div>
  );
}
