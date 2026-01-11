import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import { findNodeAndChildren } from "../../util/node.util";
import GraphCard from "../graph-card/GraphCard";
import "./LayerBCards.css";

export default function LayerBCards() {
  // card layer store
  const rootNode = useCardLayerStore((s) => s.rootNode);
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const cardLayer_B_JustifyContent = useCardLayerStore(
    (s) => s.cardLayer_B_JustifyContent
  );
  const cardLayer_B_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_B_FirstItemIndexNumber
  );
  const connectedNodeIdLayerB = useCardLayerStore(
    (s) => s.connectedNodeIdLayerB
  );
  const setConnectedNodeIdLayerB = useCardLayerStore(
    (s) => s.setConnectedNodeIdLayerB
  );
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_B_JustifyContent }}
    >
      {cardLayer_B_Data
        .map((node: HierarchyNode, index: number) => {
          const content = <div>some content layer b</div>;
          const handleOnBadgeClick = () => {
            const selectedNodeId = node.id;
            const nodesForLayerC = findNodeAndChildren(
              [rootNode],
              selectedNodeId
            )?.children;

            console.log("handleOnBadgeClick", node);
            console.log("selectedNodeId", selectedNodeId);
            console.log("nodesForLayerC", nodesForLayerC);

            setConnectedNodeIdLayerB(selectedNodeId);
            setCardLayer_C_Data(nodesForLayerC || []);
          };
          return (
            <GraphCard
              key={index}
              node={node}
              showBadge={node.children.length > 0}
              showChildConnection={connectedNodeIdLayerB === node.id}
              showParentConnection
              positionIndex={cardLayer_B_FirstItemIndexNumber}
              content={content}
              onBadgeClick={handleOnBadgeClick}
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
