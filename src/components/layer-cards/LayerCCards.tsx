import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import { getChildrenByNodeId } from "../../util/node.util";
import GraphCard from "../graph-card/GraphCard";
import "./LayerCCards.css";
import { BadgeClickPayload } from "../../types/graph.types";

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

  // window start
  const cardLayer_C_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_FirstItemIndexNumber
  );

  // selection
  const cardLayer_C_SelectedIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_C_SelectedIndexNumber
  );
  const setCardLayer_C_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_SelectedIndexNumber
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

  const setCardLayer_A_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_A_SelectedIndexNumber
  );
  const setCardLayer_B_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_B_SelectedIndexNumber
  );

  const maxSlots = APP_CONFIG.default.maxNumberOfCardsPerLayer;

  const handleBadgeClick = (
    payload: BadgeClickPayload,
    node: HierarchyNode
  ) => {
    // select current C node
    setCardLayer_C_SelectedIndexNumber(payload.positionIndex);

    if (!payload.expanded) return;

    const newChildrenForLayerC = getChildrenByNodeId(rootNode, node.id);

    // store one-step back
    setCardLayer_Tmp_Data(cardLayer_A_Data);

    // shift up
    setCardLayer_A_Data(cardLayer_B_Data);
    setCardLayer_B_Data(cardLayer_C_Data);
    setCardLayer_C_Data(newChildrenForLayerC);

    // reset indices
    setCardLayer_A_FirstItemIndexNumber(0);
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);

    setCardLayer_A_SelectedIndexNumber(0);
    setCardLayer_B_SelectedIndexNumber(0);
    setCardLayer_C_SelectedIndexNumber(0);
  };

  const visible = cardLayer_C_Data.slice(
    cardLayer_C_FirstItemIndexNumber,
    cardLayer_C_FirstItemIndexNumber + maxSlots
  );

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_C_JustifyContent }}
    >
      {visible.map((node, localIndex) => {
        const globalIndex = cardLayer_C_FirstItemIndexNumber + localIndex;

        const isSelected = globalIndex === cardLayer_C_SelectedIndexNumber;

        return (
          <GraphCard
            key={node.id}
            node={node}
            showBadge={node.children.length > 0}
            showChildren={isSelected}
            positionIndex={globalIndex}
            content={<div>some content</div>}
            isSelected={isSelected}
            isDimmed={false}
            isConnected={true}
            onBadgeClick={(payload) => handleBadgeClick(payload, node)}
          />
        );
      })}
    </div>
  );
}
