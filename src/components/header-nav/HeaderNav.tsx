import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import GraphBadge from "../graph-badge/GraphBadge";
import NavBadge from "../nav-badge/NavBadge";
import "./HeaderNav.css";
import { BadgeClickPayload } from "../../types/graph.types";
import { Chip, Typography } from "@mui/material";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Helper: keep selection inside visible window after scrolling
 */
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

export default function HeaderNav() {
  const maxSlots = APP_CONFIG.default.maxNumberOfCardsPerLayer;

  // Layer A data + indices
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );
  const cardLayer_A_SelectedIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_SelectedIndexNumber
  );

  const setCardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_FirstItemIndexNumber
  );
  const setCardLayer_A_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_SelectedIndexNumber
  );

  // Layer B/C selection for breadcrumb
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_B_SelectedIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_SelectedIndexNumber
  );

  const cardLayer_C_Data = useCardLayerStore((s) => s.cardLayer_C_Data);
  const cardLayer_C_SelectedIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_SelectedIndexNumber
  );

  // Back buffer
  const cardLayer_Tmp_Data = useCardLayerStore((s) => s.cardLayer_Tmp_Data);

  const setCardLayer_A_Data = useCardLayerStore((s) => s.setCardLayer_A_Data);
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);
  const setCardLayer_Tmp_Data = useCardLayerStore(
    (s) => s.setCardLayer_Tmp_Data
  );

  const setCardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_FirstItemIndexNumber
  );
  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );
  const setCardLayer_B_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_SelectedIndexNumber
  );
  const setCardLayer_C_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_SelectedIndexNumber
  );

  const numberOfLayerAItems = cardLayer_A_Data.length;
  const maxFirstIndex = Math.max(0, numberOfLayerAItems - maxSlots);

  // --- Horizontal nav changes window-start, not selection ---
  const handleClickLeft = () => {
    const nextStart = clamp(
      cardLayer_A_FirstItemIndexNumber - 1,
      0,
      maxFirstIndex
    );
    setCardLayer_A_FirstItemIndexNumber(nextStart);

    const nextSelected = keepSelectionVisible(
      cardLayer_A_SelectedIndexNumber,
      nextStart,
      maxSlots
    );
    setCardLayer_A_SelectedIndexNumber(nextSelected);
  };

  const handleClickRight = () => {
    const nextStart = clamp(
      cardLayer_A_FirstItemIndexNumber + 1,
      0,
      maxFirstIndex
    );
    setCardLayer_A_FirstItemIndexNumber(nextStart);

    const nextSelected = keepSelectionVisible(
      cardLayer_A_SelectedIndexNumber,
      nextStart,
      maxSlots
    );
    setCardLayer_A_SelectedIndexNumber(nextSelected);
  };

  const canGoBackOneLevel = cardLayer_Tmp_Data.length > 0;

  const handleBackClick = (_payload: BadgeClickPayload) => {
    if (!canGoBackOneLevel) return;

    // Reverse drill-down shift:
    setCardLayer_C_Data(cardLayer_B_Data);
    setCardLayer_B_Data(cardLayer_A_Data);
    setCardLayer_A_Data(cardLayer_Tmp_Data);
    setCardLayer_Tmp_Data([]);

    // reset indices
    setCardLayer_A_FirstItemIndexNumber(0);
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);

    setCardLayer_A_SelectedIndexNumber(0);
    setCardLayer_B_SelectedIndexNumber(0);
    setCardLayer_C_SelectedIndexNumber(0);
  };

  // --- Breadcrumb (stable) ---
  const nodeA = cardLayer_A_Data[cardLayer_A_SelectedIndexNumber];
  const nodeB = cardLayer_B_Data[cardLayer_B_SelectedIndexNumber];
  const nodeC = cardLayer_C_Data[cardLayer_C_SelectedIndexNumber];

  const levelText = canGoBackOneLevel ? "Drill-Down aktiv" : "Root-Ansicht";

  return (
    <div className="header-nav">
      <div className="breadcrumb">
        <div className="breadcrumb-top">
          <Chip
            size="small"
            label={levelText}
            className="breadcrumb-chip"
            variant="outlined"
          />
        </div>

        <Typography className="breadcrumb-path" variant="body2">
          <span className="crumb">
            <strong>A:</strong> {nodeA?.headerTitle ?? "–"}
          </span>
          <span className="sep">›</span>
          <span className="crumb">
            <strong>B:</strong> {nodeB?.headerTitle ?? "–"}
          </span>
          <span className="sep">›</span>
          <span className="crumb">
            <strong>C:</strong> {nodeC?.headerTitle ?? "–"}
          </span>
        </Typography>
      </div>

      {cardLayer_A_FirstItemIndexNumber > 0 &&
        numberOfLayerAItems > maxSlots && (
          <div className="nav-item-left">
            <NavBadge
              isVisible
              direction="left"
              onClick={handleClickLeft}
              counter={cardLayer_A_FirstItemIndexNumber}
            />
          </div>
        )}

      {canGoBackOneLevel && (
        <div className="nav-item-center">
          <GraphBadge
            counter={0}
            isExpanded
            nodeId="__back__"
            onClick={handleBackClick}
            positionIndex={0}
          />
        </div>
      )}

      {numberOfLayerAItems - cardLayer_A_FirstItemIndexNumber - maxSlots >
        0 && (
        <div className="nav-item-right">
          <NavBadge
            isVisible
            direction="right"
            onClick={handleClickRight}
            counter={
              numberOfLayerAItems - cardLayer_A_FirstItemIndexNumber - maxSlots
            }
          />
        </div>
      )}
    </div>
  );
}
