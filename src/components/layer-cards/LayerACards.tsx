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

  const numberOfLayerAItems = cardLayer_A_Data.length;

  const handleBadgeClick = (
    payload: BadgeClickPayload,
    node: HierarchyNode
  ) => {
    // We treat "FirstItemIndexNumber" as the current focus/selection index.
    // (This follows your existing design & navigation approach.)
    setCardLayer_A_FirstItemIndexNumber(payload.positionIndex);

    // When we change the selected parent, we reset horizontal navigation in lower layers.
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);

    if (!payload.expanded) {
      // Collapse: hide lower layers
      setCardLayer_B_Data([]);
      setCardLayer_C_Data([]);
      return;
    }

    // Expand: children of selected A-node become Layer-B
    const layerBChildren = node.children ?? [];
    setCardLayer_B_Data(layerBChildren);

    // Layer-C initially shows the children of the first Layer-B entry with children
    const layerCChildren = getChildrenOfFirstNodeWithChildren(layerBChildren);
    setCardLayer_C_Data(layerCChildren);
  };

  // "Focus" logic for a clearer UX:
  const selectedIndex = cardLayer_A_FirstItemIndexNumber;
  const hasSelection = numberOfLayerAItems > 1;

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_A_JustifyContent }}
    >
      {cardLayer_A_Data
        .map((node: HierarchyNode, index: number) => {
          const content = <div>some content</div>;

          const isSelected = index === selectedIndex;
          const isDimmed = hasSelection && !isSelected;

          return (
            <GraphCard
              key={node.id}
              node={node}
              showBadge={node.children.length > 0}
              showChildren={isSelected}
              positionIndex={index}
              content={content}
              isSelected={isSelected}
              isDimmed={isDimmed}
              isConnected={isSelected}
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
