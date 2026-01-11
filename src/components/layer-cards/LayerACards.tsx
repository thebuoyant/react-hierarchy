import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import { findNodeAndChildren } from "../../util/node.util";
import GraphCard from "../graph-card/GraphCard";
import "./LayerACards.css";

export default function LayerACards() {
  // card layer store
  const rootNode = useCardLayerStore((s) => s.rootNode);
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_JustifyContent = useCardLayerStore(
    (s) => s.cardLayer_A_JustifyContent
  );
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );
  const connectedNodeIdLayerA = useCardLayerStore(
    (s) => s.connectedNodeIdLayerA
  );
  const setConnectedNodeIdLayerA = useCardLayerStore(
    (s) => s.setConnectedNodeIdLayerA
  );
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);

  // internal calculations
  const numberOfLayerAItems = cardLayer_A_Data.length;

  return (
    <div
      className="layer-a-cards"
      style={{ justifyContent: cardLayer_A_JustifyContent }}
    >
      {cardLayer_A_Data
        .map((node: HierarchyNode, index: number) => {
          const content = <div>some content layer a</div>;
          const handleOnBadgeClick = () => {
            console.log("handleOnBadgeClick", node);
            const selectedNodeId = node.id;
            const nodesForLayerC = findNodeAndChildren(
              [rootNode],
              selectedNodeId
            )?.children;

            console.log("handleOnBadgeClick", node);
            console.log("selectedNodeId", selectedNodeId);
            console.log("nodesForLayerC", nodesForLayerC);

            setConnectedNodeIdLayerA(selectedNodeId);
            setCardLayer_B_Data(nodesForLayerC || []);
          };
          return (
            <GraphCard
              key={index}
              node={node}
              showBadge={node.children.length > 0}
              showChildConnection={connectedNodeIdLayerA === node.id}
              showParentConnection={
                numberOfLayerAItems >=
                APP_CONFIG.default.maxNumberOfCardsPerLayer
              }
              positionIndex={cardLayer_A_FirstItemIndexNumber}
              content={content}
              onBadgeClick={handleOnBadgeClick}
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
