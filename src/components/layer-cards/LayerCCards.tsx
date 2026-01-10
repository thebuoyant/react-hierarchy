import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import { getChildrenByNodeId } from "../../util/node.util";
import GraphCard from "../graph-card/GraphCard";
import "./LayerCCards.css";
import { BadgeClickPayload } from "../../types/graph.types";

/**
 * Layer-C is the last visible layer.
 * If a Layer-C node has children, we "drill down":
 *   - A <- B
 *   - B <- C
 *   - C <- children of selected C node
 */
export default function LayerCCards() {
  const rootNode = useCardLayerStore((s) => s.rootNode);

  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const setCardLayer_A_Data = useCardLayerStore((s) => s.setCardLayer_A_Data);

  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);

  const cardLayer_C_Data = useCardLayerStore((s) => s.cardLayer_C_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);

  const setCardLayer_Tmp_Data = useCardLayerStore(
    (s) => s.setCardLayer_Tmp_Data
  );

  const cardLayer_C_JustifyContent = useCardLayerStore(
    (s) => s.cardLayer_C_JustifyContent
  );
  const cardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_FirstItemIndexNumber
  );

  const setCardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_FirstItemIndexNumber
  );
  const setCardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_FirstItemIndexNumber
  );
  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );

  const handleBadgeClick = (
    payload: BadgeClickPayload,
    node: HierarchyNode
  ) => {
    setCardLayer_C_FirstItemIndexNumber(payload.positionIndex);

    if (!payload.expanded) {
      // In Layer-C we do not "collapse" into a lower layer (there is none).
      return;
    }

    // Drill-down: fetch children from root (always the truth source)
    const newChildrenForLayerC = getChildrenByNodeId(rootNode, node.id);

    // Save current A so we can go one step back
    setCardLayer_Tmp_Data(cardLayer_A_Data);

    // Shift levels up
    setCardLayer_A_Data(cardLayer_B_Data);
    setCardLayer_B_Data(cardLayer_C_Data);
    setCardLayer_C_Data(newChildrenForLayerC);

    // Reset selection & horizontal windows
    setCardLayer_A_FirstItemIndexNumber(0);
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);
  };

  const selectedIndex = cardLayer_C_FirstItemIndexNumber;

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_C_JustifyContent }}
    >
      {cardLayer_C_Data
        .map((node: HierarchyNode, index: number) => {
          const content = <div>some content</div>;
          const isSelected = index === selectedIndex;

          return (
            <GraphCard
              key={node.id}
              node={node}
              showBadge={node.children.length > 0}
              showChildren={isSelected}
              positionIndex={index}
              content={content}
              isSelected={isSelected}
              isDimmed={false}
              isConnected
              onBadgeClick={(payload) => handleBadgeClick(payload, node)}
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
