import { useCardLayerStore } from "../../store/cardLayerStore";
import { HierarchyNode } from "../../types/data.type";
import GraphCard from "../graph-card/GraphCard";
import "./LayerACards.css";

export default function LayerACards() {
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_A_FirstItemIndexNumber = useCardLayerStore(
    (s) => s.cardLayer_A_FirstItemIndexNumber
  );

  return (
    <div className="layer-a-cards">
      {cardLayer_A_Data.map((node: HierarchyNode, index: number) => {
        console.log("??? > node:", node);
        const content = <div>some content</div>;
        return (
          <GraphCard
            key={index}
            node={node}
            showBadge
            showChildren
            showParent={false}
            positionIndex={cardLayer_A_FirstItemIndexNumber}
            content={content}
          />
        );
      })}
    </div>
  );
}
