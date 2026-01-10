import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { useLayoutStore } from "../../store/layoutStore";
import NavBadge from "../nav-badge/NavBadge";
import "./LayerBBranch.css";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function keepSelectionVisible(
  selectedIndex: number,
  windowStart: number,
  maxSlots: number
) {
  const windowEnd = windowStart + maxSlots - 1;
  if (selectedIndex < windowStart) return windowStart;
  if (selectedIndex > windowEnd) return windowEnd;
  return selectedIndex;
}

export default function LayerBBranch() {
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);
  const branchHeight = useLayoutStore((s) => s.branchHeight);

  const slotWidth = 2 * cardSpace + cardWidth;
  const maxSlots = APP_CONFIG.default.maxNumberOfCardsPerLayer;
  const totalWidth = maxSlots * slotWidth;

  // Parent B
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );
  const cardLayer_B_SelectedIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_SelectedIndexNumber
  );

  // Child C
  const cardLayer_C_Data = useCardLayerStore((s) => s.cardLayer_C_Data);
  const cardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_FirstItemIndexNumber
  );
  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );
  const cardLayer_C_SelectedIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_SelectedIndexNumber
  );
  const setCardLayer_C_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_SelectedIndexNumber
  );

  const numberOfLayerCItems = cardLayer_C_Data.length;
  const maxFirstIndex = Math.max(0, numberOfLayerCItems - maxSlots);

  const handleClickLeft = () => {
    const nextStart = clamp(
      cardLayer_C_FirstItemIndexNumber - 1,
      0,
      maxFirstIndex
    );
    setCardLayer_C_FirstItemIndexNumber(nextStart);

    const nextSelected = keepSelectionVisible(
      cardLayer_C_SelectedIndexNumber,
      nextStart,
      maxSlots
    );
    setCardLayer_C_SelectedIndexNumber(nextSelected);
  };

  const handleClickRight = () => {
    const nextStart = clamp(
      cardLayer_C_FirstItemIndexNumber + 1,
      0,
      maxFirstIndex
    );
    setCardLayer_C_FirstItemIndexNumber(nextStart);

    const nextSelected = keepSelectionVisible(
      cardLayer_C_SelectedIndexNumber,
      nextStart,
      maxSlots
    );
    setCardLayer_C_SelectedIndexNumber(nextSelected);
  };

  const parentVisibleSlots = Math.min(
    maxSlots,
    Math.max(0, cardLayer_B_Data.length - cardLayer_B_FirstItemIndexNumber)
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
          cardLayer_B_SelectedIndexNumber - cardLayer_B_FirstItemIndexNumber,
          0,
          parentVisibleSlots - 1
        );

  const parentX = parentOffset + (focusSlot + 0.5) * slotWidth;

  const childGroupLeft = childOffset;
  const childGroupRight = childOffset + childVisibleSlots * slotWidth;

  const lineLeft = Math.min(parentX, childGroupLeft);
  const lineRight = Math.max(parentX, childGroupRight);
  const lineWidth = Math.max(0, lineRight - lineLeft);

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
              left: lineLeft,
              width: lineWidth,
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
