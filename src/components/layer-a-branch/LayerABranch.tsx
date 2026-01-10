import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { useLayoutStore } from "../../store/layoutStore";
import NavBadge from "../nav-badge/NavBadge";
import "./LayerABranch.css";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function LayerABranch() {
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);
  const branchHeight = useLayoutStore((s) => s.branchHeight);

  // Parent layer (A)
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );

  // Child layer (B)
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );
  const setCardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_FirstItemIndexNumber
  );

  const slotWidth = 2 * cardSpace + cardWidth;
  const maxSlots = APP_CONFIG.default.maxNumberOfCardsPerLayer;
  const totalWidth = maxSlots * slotWidth;

  const numberOfLayerBItems = cardLayer_B_Data.length;

  const maxFirstIndex = Math.max(0, numberOfLayerBItems - maxSlots);

  const handleClickLeft = () => {
    const next = clamp(cardLayer_B_FirstItemIndexNumber - 1, 0, maxFirstIndex);
    setCardLayer_B_FirstItemIndexNumber(next);
  };

  const handleClickRight = () => {
    const next = clamp(cardLayer_B_FirstItemIndexNumber + 1, 0, maxFirstIndex);
    setCardLayer_B_FirstItemIndexNumber(next);
  };

  // --- Focus / connection geometry (junior-friendly math) ---
  // Visible cards are the slice: [firstIndex .. firstIndex + maxSlots)
  const parentFirstIndex = cardLayer_A_FirstItemIndexNumber;
  const selectedParentIndex = cardLayer_A_FirstItemIndexNumber; // same store value in your current design

  const parentVisibleSlots = Math.min(
    maxSlots,
    Math.max(0, cardLayer_A_Data.length - parentFirstIndex)
  );
  const childVisibleSlots = Math.min(
    maxSlots,
    Math.max(0, cardLayer_B_Data.length - cardLayer_B_FirstItemIndexNumber)
  );

  // Cards are centered within the total width.
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
    <div className="layer-a-branch" style={{ width: totalWidth }}>
      {/* Horizontal navigation for Layer-B */}
      {cardLayer_B_FirstItemIndexNumber > 0 &&
        numberOfLayerBItems > maxSlots && (
          <div className="nav-item-left">
            <NavBadge
              isVisible
              direction="left"
              onClick={handleClickLeft}
              counter={cardLayer_B_FirstItemIndexNumber}
            />
          </div>
        )}

      {/* Focus connections */}
      {showConnections && (
        <div className="branch-focus" style={{ height: branchHeight }}>
          {/* Parent drop line (from parent card down to the middle) */}
          <div
            className="branch-parent-drop"
            style={{
              left: parentX,
              height: branchHeight / 2,
              backgroundColor: APP_CONFIG.layout.branch.lineColor,
            }}
          />

          {/* Horizontal line for the visible children */}
          <div
            className="branch-children-line"
            style={{
              left: childOffset,
              width: childVisibleSlots * slotWidth,
              top: branchHeight / 2,
              backgroundColor: APP_CONFIG.layout.branch.lineColor,
            }}
          />

          {/* Child drops + dots */}
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

          {/* A dot under the parent helps the eye track the focus */}
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

      {numberOfLayerBItems - cardLayer_B_FirstItemIndexNumber - maxSlots >
        0 && (
        <div className="nav-item-right">
          <NavBadge
            isVisible
            direction="right"
            onClick={handleClickRight}
            counter={
              numberOfLayerBItems - cardLayer_B_FirstItemIndexNumber - maxSlots
            }
          />
        </div>
      )}
    </div>
  );
}
