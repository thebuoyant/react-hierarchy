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
        // console.log("positionIndex", positionIndexNumber);
        // console.log("numberOfNodes", numberOfNodes);
        const calculateLineColorSectionAA = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return "transparent";
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionAB = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionAC = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionAD = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionAE = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionAF = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
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
                backgroundColor: calculateLineColorSectionAA(),
              }}
            ></div>
            <div
              className="branch-section-b"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionAB(),
              }}
            ></div>
            <div
              className="branch-section-c"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionAC(),
              }}
            ></div>
            <div
              className="branch-section-d"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionAD(),
              }}
            ></div>
            <div
              className="branch-section-e"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionAE(),
              }}
            ></div>
            <div
              className="branch-section-f"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionAF(),
              }}
            ></div>
          </>
        );
      case "b":
        // console.log("positionIndex", positionIndexNumber);
        // console.log("numberOfNodes", numberOfNodes);
        const calculateLineColorSectionBA = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return "transparent";
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionBB = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionBC = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionBD = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionBE = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 2 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            return "transparent";
          }
        };
        const calculateLineColorSectionBF = () => {
          if (positionIndexNumber === 0 && numberOfNodes >= 3) {
            return APP_CONFIG.layout.branch.lineColor;
          }
          if (positionIndexNumber === 1 && numberOfNodes > 3) {
            return APP_CONFIG.layout.branch.lineColor;
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
                backgroundColor: calculateLineColorSectionBA(),
              }}
            ></div>
            <div
              className="branch-section-b"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionBB(),
              }}
            ></div>
            <div
              className="branch-section-c"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionBC(),
              }}
            ></div>
            <div
              className="branch-section-d"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionBD(),
              }}
            ></div>
            <div
              className="branch-section-e"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionBE(),
              }}
            ></div>
            <div
              className="branch-section-f"
              style={{
                width: cardTotalWidth / 2,
                backgroundColor: calculateLineColorSectionBF(),
              }}
            ></div>
          </>
        );

      default:
        return <div></div>;
    }
  };

  return renderBranchLine();
}
