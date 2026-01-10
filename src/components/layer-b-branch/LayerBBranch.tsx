import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { useLayoutStore } from "../../store/layoutStore";
import NavBadge from "../nav-badge/NavBadge";
import "./LayerBBranch.css";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

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

  const maxFirstIndex = Math.max(
    0,
    numberOfLayerCItems - APP_CONFIG.default.maxNumberOfCardsPerLayer
  );

  // actions
  const handleClickLeft = () => {
    const next = clamp(cardLayer_C_FirstItemIndexNumber - 1, 0, maxFirstIndex);
    setCardLayer_C_FirstItemIndexNumber(next);
  };

  const handleClickRight = () => {
    const next = clamp(cardLayer_C_FirstItemIndexNumber + 1, 0, maxFirstIndex);
    setCardLayer_C_FirstItemIndexNumber(next);
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
        <div
          className="branch-line-item"
          style={{
            width: branchLineItemWidth,
            backgroundColor: branchLineItemColor,
          }}
        ></div>

        <div
          className="branch-line-item"
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
