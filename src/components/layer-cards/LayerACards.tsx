import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import { getChildrenOfFirstNodeWithChildren } from "../../util/node.util";
import GraphCard from "../graph-card/GraphCard";
import "./LayerACards.css";
import { BadgeClickPayload } from "../../types/graph.types";

export default function LayerACards() {
  // card layer store
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_JustifyContent = useCardLayerStore(
    (s) => s.cardLayer_A_JustifyContent
  );
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );
  const setCardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_FirstItemIndexNumber
  );

  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);

  const setCardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_FirstItemIndexNumber
  );
  const setCardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_FirstItemIndexNumber
  );

  // internal calculations
  const numberOfLayerAItems = cardLayer_A_Data.length;

  const handleBadgeClick = (
    payload: BadgeClickPayload,
    node: HierarchyNode
  ) => {
    // Which card should show the "expanded" state?
    setCardLayer_A_FirstItemIndexNumber(payload.positionIndex);

    // When we move vertically, we always reset the horizontal "window"
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);

    if (!payload.expanded) {
      // Collapse: hide children below
      setCardLayer_B_Data([]);
      setCardLayer_C_Data([]);
      return;
    }

    // Expand: children of selected A-node become Layer-B
    const layerBChildren = node.children ?? [];
    setCardLayer_B_Data(layerBChildren);

    // For Layer-C we show the children of the first Layer-B entry that actually has children.
    // (This matches your initial logic in ReactHierarchy.tsx)
    const layerCChildren = getChildrenOfFirstNodeWithChildren(layerBChildren);
    setCardLayer_C_Data(layerCChildren);
  };

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_A_JustifyContent }}
    >
      {cardLayer_A_Data
        .map((node: HierarchyNode, index: number) => {
          const content = <div>some content</div>;

          return (
            <GraphCard
              key={node.id}
              node={node}
              showBadge={node.children.length > 0}
              showChildren={index === cardLayer_A_FirstItemIndexNumber}
              showParent={
                numberOfLayerAItems >=
                APP_CONFIG.default.maxNumberOfCardsPerLayer
              }
              positionIndex={index}
              content={content}
              onBadgeClick={(payload) => handleBadgeClick(payload, node)}
            />
          );
        })
        .slice(
          cardLayer_A_FirstItemIndexNumber,
          APP_CONFIG.default.maxNumberOfCardsPerLayer +
            cardLayer_A_FirstItemIndexNumber
        )}
    </div>
  );
}
