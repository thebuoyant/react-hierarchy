import { APP_CONFIG } from "../../app.config";
import { useLayoutStore } from "../../store/layoutStore";

export type BranchLineProps = {
  numberOfNodes: number;
  positionIndexNumber: number;
  branchForLayer: "a" | "b" | "c";
};

export default function BranchLine({
  numberOfNodes = 5,
  positionIndexNumber = 0,
  branchForLayer = "a",
}: BranchLineProps) {
  // layout store
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);

  const maxNumberOfNodes = APP_CONFIG.default.maxNumberOfCardsPerLayer;
  const totalWidth = (2 * cardSpace + cardWidth) * maxNumberOfNodes;
  const branchLineWidth = numberOfNodes * (2 * cardSpace + cardWidth);
  const cardTotalWidth = 2 * cardSpace + cardWidth;

  // console.log("branchForLayer", branchForLayer);
  // console.log("totalWidth", totalWidth);
  // console.log("maxNumberOfNodes", maxNumberOfNodes);
  // console.log("numberOfNodes", numberOfNodes);
  // console.log("branchLineWidth", branchLineWidth);
  // console.log("cardTotalWidth", cardTotalWidth);
  // console.log("indexNumber", indexNumber);
  // console.log("------------------------------------------");

  const renderBranchLine = () => {
    switch (branchForLayer) {
      case "a":
        console.log("positionIndex", positionIndexNumber);
        console.log("numberOfNodes", numberOfNodes);
        const calculateLineColorSectionA = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return "transparent";
          } else if (
            (positionIndexNumber === 1 || positionIndexNumber === 2) &&
            numberOfNodes > 3
          ) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionB = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else if (
            (positionIndexNumber === 1 || positionIndexNumber === 2) &&
            numberOfNodes > 3
          ) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionC = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else if (
            (positionIndexNumber === 1 || positionIndexNumber === 2) &&
            numberOfNodes > 3
          ) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionD = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else if (
            (positionIndexNumber === 1 || positionIndexNumber === 2) &&
            numberOfNodes > 3
          ) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionE = () => {
          if (positionIndexNumber === 0 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else if (
            (positionIndexNumber === 1 || positionIndexNumber === 2) &&
            numberOfNodes > 3
          ) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionF = () => {
          if (positionIndexNumber === 0 && numberOfNodes > 3) {
            return "transparent";
          } else if (
            (positionIndexNumber === 1 || positionIndexNumber === 2) &&
            numberOfNodes > 3
          ) {
            return "transparent";
          } else {
            return "transparent";
          }
        };
        return (
          <>
            <div
              className="branch-section-a"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionA(),
              }}
            ></div>
            <div
              className="branch-section-b"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionB(),
              }}
            ></div>
            <div
              className="branch-section-c"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionC(),
              }}
            ></div>
            <div
              className="branch-section-d"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionD(),
              }}
            ></div>
            <div
              className="branch-section-e"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionE(),
              }}
            ></div>
            <div
              className="branch-section-f"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionF(),
              }}
            ></div>
          </>
        );
      default:
        return <div></div>;
    }
  };

  return renderBranchLine();
  // <div
  // // style={{
  // //   width: calculateLineWidth(),
  // //   backgroundColor: branchLineItemColor,
  // //   position: "relative",
  // //   left: calculateLineOffset(),
  // // }}
  // ></div>
}
