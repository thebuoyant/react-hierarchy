import { Chip } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { APP_CONFIG } from "../../app.config";
import { useLayoutStore } from "../../store/layoutStore";
import { useEffect } from "react";

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

  // local state

  const branchLineItemColor = APP_CONFIG.layout.branch.lineColor;

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

  // const calculateLineWidth = () => {
  //   if (numberOfNodes > maxNumberOfNodes) {
  //     switch (positionIndexNumber) {
  //       case 0: {
  //         return totalWidth - cardTotalWidth / 2;
  //       }
  //       case 2: {
  //         return totalWidth - cardTotalWidth / 2;
  //       }
  //       default:
  //         return totalWidth;
  //     }
  //   }
  //   if (numberOfNodes === 3) {
  //     return (2 * cardSpace + cardWidth) * 2;
  //   }
  //   if (numberOfNodes === 2) {
  //     return 2 * cardSpace + cardWidth;
  //   }

  //   if (numberOfNodes === 1) {
  //     return 0;
  //   }

  //   return totalWidth;
  // };

  // const calculateLineOffset = () => {
  //   if (numberOfNodes > maxNumberOfNodes) {
  //     switch (positionIndexNumber) {
  //       case 0: {
  //         return cardTotalWidth / 2;
  //       }
  //       default:
  //         return 0;
  //     }
  //   }
  //   if (numberOfNodes === 3) {
  //     switch (positionIndexNumber) {
  //       case 0: {
  //         return cardTotalWidth / 2;
  //       }
  //       default:
  //         return 0;
  //     }
  //   }
  //   if (numberOfNodes === 2) {
  //     switch (positionIndexNumber) {
  //       case 0: {
  //         return cardTotalWidth;
  //       }
  //       default:
  //         return 0;
  //     }
  //   }
  //   if (numberOfNodes === 1) {
  //     return 0;
  //   }

  //   return 0;
  // };

  useEffect(() => {
    console.log("render");
  }, [numberOfNodes, positionIndexNumber, branchForLayer]);

  const renderBranchLine = () => {
    switch (branchForLayer) {
      case "a":
        console.log("positionIndex", positionIndexNumber);
        console.log("numberOfNodes", numberOfNodes);
        const calculateLineColorSectionA = () => {
          if (positionIndexNumber === 0 && numberOfNodes > 3) {
            return "transparent";
          } else if (
            (positionIndexNumber === 1 || positionIndexNumber === 2) &&
            numberOfNodes > 3
          ) {
            return APP_CONFIG.layout.branch.lineColor;
          } else {
            console.log("else");
            return "transparent";
          }
          return "transparent";
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
              style={{ width: cardTotalWidth / 2 }}
            ></div>
            <div
              className="branch-section-c"
              style={{ width: cardTotalWidth / 2 }}
            ></div>
            <div
              className="branch-section-d"
              style={{ width: cardTotalWidth / 2 }}
            ></div>
            <div
              className="branch-section-e"
              style={{ width: cardTotalWidth / 2 }}
            ></div>
            <div
              className="branch-section-f"
              style={{ width: cardTotalWidth / 2 }}
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
