import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import { getChildrenOfFirstNodeWithChildren } from "../../util/node.util";
import GraphCard from "../graph-card/GraphCard";
import "./LayerACards.css";
import { BadgeClickPayload } from "../../types/graph.types";

export default function LayerACards() {
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_JustifyContent = useCardLayerStore(
    (s) => s.cardLayer_A_JustifyContent
  );

  // window start (slice)
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );
  const setCardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_FirstItemIndexNumber
  );

  // selected index (focus)
  const cardLayer_A_SelectedIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_SelectedIndexNumber
  );
  const setCardLayer_A_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_SelectedIndexNumber
  );

  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);

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

  const maxSlots = APP_CONFIG.default.maxNumberOfCardsPerLayer;

  const handleBadgeClick = (
    payload: BadgeClickPayload,
    node: HierarchyNode
  ) => {
    // ✅ Update selection (this is what the user chose)
    setCardLayer_A_SelectedIndexNumber(payload.positionIndex);

    // Reset lower layers navigation + selection
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);
    setCardLayer_B_SelectedIndexNumber(0);
    setCardLayer_C_SelectedIndexNumber(0);

    if (!payload.expanded) {
      setCardLayer_B_Data([]);
      setCardLayer_C_Data([]);
      return;
    }

    const layerBChildren = node.children ?? [];
    setCardLayer_B_Data(layerBChildren);

    const layerCChildren = getChildrenOfFirstNodeWithChildren(layerBChildren);
    setCardLayer_C_Data(layerCChildren);
  };

  const visible = cardLayer_A_Data.slice(
    cardLayer_A_FirstItemIndexNumber,
    cardLayer_A_FirstItemIndexNumber + maxSlots
  );

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_A_JustifyContent }}
    >
      {visible.map((node, localIndex) => {
        const globalIndex = cardLayer_A_FirstItemIndexNumber + localIndex;

        const isSelected = globalIndex === cardLayer_A_SelectedIndexNumber;
        const isDimmed = visible.length > 1 && !isSelected;

        return (
          <GraphCard
            key={node.id}
            node={node}
            showBadge={node.children.length > 0}
            showChildren={isSelected}
            positionIndex={globalIndex}
            content={<div>some content</div>}
            isSelected={isSelected}
            isDimmed={isDimmed}
            isConnected={isSelected}
            onBadgeClick={(payload) => handleBadgeClick(payload, node)}
          />
        );
      })}
    </div>
  );
}
