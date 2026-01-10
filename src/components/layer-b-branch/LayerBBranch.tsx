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
  const branchHeight = useLayoutStore((s) => s.branchHeight);

  // Parent layer (B)
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );

  // Child layer (C)
  const cardLayer_C_Data = useCardLayerStore((s) => s.cardLayer_C_Data);
  const cardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_FirstItemIndexNumber
  );
  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );

  const slotWidth = 2 * cardSpace + cardWidth;
  const maxSlots = APP_CONFIG.default.maxNumberOfCardsPerLayer;
  const totalWidth = maxSlots * slotWidth;

  const numberOfLayerCItems = cardLayer_C_Data.length;
  const maxFirstIndex = Math.max(0, numberOfLayerCItems - maxSlots);

  const handleClickLeft = () => {
    const next = clamp(cardLayer_C_FirstItemIndexNumber - 1, 0, maxFirstIndex);
    setCardLayer_C_FirstItemIndexNumber(next);
  };

  const handleClickRight = () => {
    const next = clamp(cardLayer_C_FirstItemIndexNumber + 1, 0, maxFirstIndex);
    setCardLayer_C_FirstItemIndexNumber(next);
  };

  // --- Focus / connection geometry ---
  const parentFirstIndex = cardLayer_B_FirstItemIndexNumber;
  const selectedParentIndex = cardLayer_B_FirstItemIndexNumber; // current design: same value

  const parentVisibleSlots = Math.min(
    maxSlots,
    Math.max(0, cardLayer_B_Data.length - parentFirstIndex)
  );
  const childVisibleSlots = Math.min(
    maxSlots,
    Math.max(0, cardLayer_C_Data.length - cardLayer_C_FirstItemIndexNumber)
  );

  const parentOffset = (totalWidth - parentVisibleSlots * slotWidth) / 2;
  const childOffset = (totalWidth - childVisibleSlots * slotWidth) / 2;

  const focusSlot =
    parentVisibleSlots === 0
      ? 0
      : clamp(
          selectedParentIndex - parentFirstIndex,
          0,
          parentVisibleSlots - 1
        );

  const parentX = parentOffset + (focusSlot + 0.5) * slotWidth;

  const showConnections = parentVisibleSlots > 0 && childVisibleSlots > 0;

  return (
    <div className="layer-b-branch" style={{ width: totalWidth }}>
      {cardLayer_C_FirstItemIndexNumber > 0 &&
        numberOfLayerCItems > maxSlots && (
          <div className="nav-item-left">
            <NavBadge
              isVisible
              direction="left"
              onClick={handleClickLeft}
              counter={cardLayer_C_FirstItemIndexNumber}
            />
          </div>
        )}

      {showConnections && (
        <div className="branch-focus" style={{ height: branchHeight }}>
          <div
            className="branch-parent-drop"
            style={{
              left: parentX,
              height: branchHeight / 2,
              backgroundColor: APP_CONFIG.layout.branch.lineColor,
            }}
          />

          <div
            className="branch-children-line"
            style={{
              left: childOffset,
              width: childVisibleSlots * slotWidth,
              top: branchHeight / 2,
              backgroundColor: APP_CONFIG.layout.branch.lineColor,
            }}
          />

          {Array.from({ length: childVisibleSlots }).map((_, i) => {
            const x = childOffset + (i + 0.5) * slotWidth;

            return (
              <div key={i}>
                <div
                  className="branch-child-drop"
                  style={{
                    left: x,
                    top: branchHeight / 2,
                    height: branchHeight / 2,
                    backgroundColor: APP_CONFIG.layout.branch.lineColor,
                  }}
                />
                <div
                  className="branch-dot"
                  style={{
                    left: x,
                    top: branchHeight / 2,
                    backgroundColor: APP_CONFIG.layout.branch.lineColor,
                  }}
                />
              </div>
            );
          })}

          <div
            className="branch-dot branch-dot--parent"
            style={{
              left: parentX,
              top: branchHeight / 2,
              backgroundColor: APP_CONFIG.layout.branch.lineColor,
            }}
          />
        </div>
      )}

      {numberOfLayerCItems - cardLayer_C_FirstItemIndexNumber - maxSlots >
        0 && (
        <div className="nav-item-right">
          <NavBadge
            isVisible
            direction="right"
            onClick={handleClickRight}
            counter={
              numberOfLayerCItems - cardLayer_C_FirstItemIndexNumber - maxSlots
            }
          />
        </div>
      )}
    </div>
  );
}
