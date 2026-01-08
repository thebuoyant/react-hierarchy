import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import GraphCard from "../graph-card/GraphCard";
import "./LayerCCards.css";

export default function LayerCCards() {
  const cardLayer_C_Data = useCardLayerStore((s) => s.cardLayer_C_Data);
  const cardLayer_C_JustifyContent = useCardLayerStore(
    (s) => s.cardLayer_C_JustifyContent
  );
  const cardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_FirstItemIndexNumber
  );

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_C_JustifyContent }}
    >
      {cardLayer_C_Data
        .map((node: HierarchyNode, index: number) => {
          const content = <div>some content</div>;
          const handleOnBadgeClick = () => {
            console.log("handleOnBadgeClick", node);
          };
          return (
            <GraphCard
              key={index}
              node={node}
              showBadge={node.children.length > 0}
              showChildren={false}
              showParent
              positionIndex={cardLayer_C_FirstItemIndexNumber}
              content={content}
              onBadgeClick={handleOnBadgeClick}
            />
          );
        })
        .slice(
          cardLayer_C_FirstItemIndexNumber,
          APP_CONFIG.default.maxNumberOfCardsPerLayer +
            cardLayer_C_FirstItemIndexNumber
        )}
    </div>
  );
}
