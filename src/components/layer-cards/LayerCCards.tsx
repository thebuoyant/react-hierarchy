import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import { getChildrenByNodeId } from "../../util/node.util";
import GraphCard from "../graph-card/GraphCard";
import "./LayerCCards.css";

export default function LayerCCards() {
  const rootNode = useCardLayerStore((s) => s.rootNode);
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const setCardLayer_A_Data = useCardLayerStore((s) => s.setCardLayer_A_Data);
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);
  const setCardLayer_Tmp_Data = useCardLayerStore(
    (s) => s.setCardLayer_Tmp_Data
  );
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
            const selectedNodeId = node.id;
            const newChildrenForLayerC = getChildrenByNodeId(
              rootNode,
              selectedNodeId
            );

            setCardLayer_Tmp_Data(cardLayer_A_Data);
            setCardLayer_A_Data(cardLayer_B_Data);
            setCardLayer_B_Data(cardLayer_C_Data);
            setCardLayer_C_Data(newChildrenForLayerC);
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
