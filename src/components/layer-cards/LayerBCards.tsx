import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import GraphCard from "../graph-card/GraphCard";
import "./LayerBCards.css";
import { BadgeClickPayload } from "../../types/graph.types";

export default function LayerBCards() {
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_B_JustifyContent = useCardLayerStore(
    (s) => s.cardLayer_B_JustifyContent
  );

  // window start
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );

  // selected
  const cardLayer_B_SelectedIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_SelectedIndexNumber
  );
  const setCardLayer_B_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_SelectedIndexNumber
  );

  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);

  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );
  const setCardLayer_C_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_SelectedIndexNumber
  );

  const maxSlots = APP_CONFIG.default.maxNumberOfCardsPerLayer;

  const handleBadgeClick = (
    payload: BadgeClickPayload,
    node: HierarchyNode
  ) => {
    // ✅ focus B selection
    setCardLayer_B_SelectedIndexNumber(payload.positionIndex);

    // reset C scrolling + selection
    setCardLayer_C_FirstItemIndexNumber(0);
    setCardLayer_C_SelectedIndexNumber(0);

    if (!payload.expanded) {
      setCardLayer_C_Data([]);
      return;
    }

    setCardLayer_C_Data(node.children ?? []);
  };

  const visible = cardLayer_B_Data.slice(
    cardLayer_B_FirstItemIndexNumber,
    cardLayer_B_FirstItemIndexNumber + maxSlots
  );

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_B_JustifyContent }}
    >
      {visible.map((node, localIndex) => {
        const globalIndex = cardLayer_B_FirstItemIndexNumber + localIndex;

        const isSelected = globalIndex === cardLayer_B_SelectedIndexNumber;
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
            isConnected={true}
            onBadgeClick={(payload) => handleBadgeClick(payload, node)}
          />
        );
      })}
    </div>
  );
}
