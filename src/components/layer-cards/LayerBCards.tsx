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
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );

  const setCardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_FirstItemIndexNumber
  );

  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);
  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );

  const handleBadgeClick = (
    payload: BadgeClickPayload,
    node: HierarchyNode
  ) => {
    setCardLayer_B_FirstItemIndexNumber(payload.positionIndex);

    // When we select a different Layer-B item we reset the horizontal navigation of Layer-C
    setCardLayer_C_FirstItemIndexNumber(0);

    if (!payload.expanded) {
      setCardLayer_C_Data([]);
      return;
    }

    // Expand: children of selected B-node become Layer-C
    setCardLayer_C_Data(node.children ?? []);
  };

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_B_JustifyContent }}
    >
      {cardLayer_B_Data
        .map((node: HierarchyNode, index: number) => {
          const content = <div>some content</div>;

          return (
            <GraphCard
              key={node.id}
              node={node}
              showBadge={node.children.length > 0}
              showChildren={index === cardLayer_B_FirstItemIndexNumber}
              showParent
              positionIndex={index}
              content={content}
              onBadgeClick={(payload) => handleBadgeClick(payload, node)}
            />
          );
        })
        .slice(
          cardLayer_B_FirstItemIndexNumber,
          APP_CONFIG.default.maxNumberOfCardsPerLayer +
            cardLayer_B_FirstItemIndexNumber
        )}
    </div>
  );
}
