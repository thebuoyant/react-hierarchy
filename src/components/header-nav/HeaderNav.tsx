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

export default function HeaderNav() {
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );
  const setCardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_FirstItemIndexNumber
  );

  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );

  const cardLayer_C_Data = useCardLayerStore((s) => s.cardLayer_C_Data);
  const cardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_FirstItemIndexNumber
  );

  // Simple one-step back buffer (set in Layer-C drill-down)
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

  const numberOfLayerAItems = cardLayer_A_Data.length;
  const maxSlots = APP_CONFIG.default.maxNumberOfCardsPerLayer;

  const maxFirstIndex = Math.max(0, numberOfLayerAItems - maxSlots);

  const handleClickLeft = () => {
    const next = clamp(cardLayer_A_FirstItemIndexNumber - 1, 0, maxFirstIndex);
    setCardLayer_A_FirstItemIndexNumber(next);
  };

  const handleClickRight = () => {
    const next = clamp(cardLayer_A_FirstItemIndexNumber + 1, 0, maxFirstIndex);
    setCardLayer_A_FirstItemIndexNumber(next);
  };

  const canGoBackOneLevel = cardLayer_Tmp_Data.length > 0;

  const handleBackClick = (_payload: BadgeClickPayload) => {
    if (!canGoBackOneLevel) return;

    // Reverse the drill-down shift:
    //   C -> B, B -> A, A -> TMP
    setCardLayer_C_Data(cardLayer_B_Data);
    setCardLayer_B_Data(cardLayer_A_Data);
    setCardLayer_A_Data(cardLayer_Tmp_Data);
    setCardLayer_Tmp_Data([]);

    // Reset selection & horizontal windows
    setCardLayer_A_FirstItemIndexNumber(0);
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);
  };

  // --- Breadcrumb (Where am I?) ---
  const nodeA = cardLayer_A_Data[cardLayer_A_FirstItemIndexNumber];
  const nodeB = cardLayer_B_Data[cardLayer_B_FirstItemIndexNumber];
  const nodeC = cardLayer_C_Data[cardLayer_C_FirstItemIndexNumber];

  // Simple level indicator:
  // If Tmp has data we are "drilled down"
  const levelText = canGoBackOneLevel ? "Drill-Down aktiv" : "Root-Ansicht";

  return (
    <div className="header-nav">
      {/* Breadcrumb center */}
      <div className="breadcrumb">
        <div className="breadcrumb-top">
          <Chip
            size="small"
            label={levelText}
            className="breadcrumb-chip"
            variant="outlined"
          />
          {canGoBackOneLevel && (
            <div className="breadcrumb-backhint">
              <Typography variant="caption">
                (Badge in der Mitte = 1 Schritt zurück)
              </Typography>
            </div>
          )}
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

      {/* Horizontal navigation for Layer-A */}
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

      {/* Back (drill-down) */}
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
