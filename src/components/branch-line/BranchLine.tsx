import { Chip } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { APP_CONFIG } from "../../app.config";
import { useLayoutStore } from "../../store/layoutStore";

export type BranchLineProps = {
  numberOfNodes: number;
  indexNumber: number;
};

export default function BranchLine({
  numberOfNodes = 5,
  indexNumber = 0,
}: BranchLineProps) {
  // layout store
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);

  const branchLineItemColor = APP_CONFIG.layout.branch.lineColor;

  const maxNumberOfNodes = APP_CONFIG.default.maxNumberOfCardsPerLayer;
  const totalWidth = (2 * cardSpace + cardWidth) * maxNumberOfNodes;
  const branchLineWidth = numberOfNodes * (2 * cardSpace + cardWidth);
  const cardTotalWidth = 2 * cardSpace + cardWidth;

  console.log("totalWidth", totalWidth);
  console.log("maxNumberOfNodes", maxNumberOfNodes);
  console.log("numberOfNodes", numberOfNodes);
  console.log("branchLineWidth", branchLineWidth);
  console.log("cardTotalWidth", cardTotalWidth);
  console.log("indexNumber", indexNumber);

  const calculateLineWidth = () => {
    if (numberOfNodes > maxNumberOfNodes) {
      switch (indexNumber) {
        case 0: {
          return totalWidth - cardTotalWidth / 2;
        }
        case 2: {
          return totalWidth - cardTotalWidth / 2;
        }
        default:
          return totalWidth;
      }
    }
    if (numberOfNodes === 3) {
      return (2 * cardSpace + cardWidth) * 2;
    }

    return totalWidth;
  };

  const calculateLineOffset = () => {
    if (numberOfNodes > maxNumberOfNodes) {
      switch (indexNumber) {
        case 0: {
          return cardTotalWidth / 2;
        }
        default:
          return 0;
      }
    }
    if (numberOfNodes === 3) {
      switch (indexNumber) {
        case 0: {
          return cardTotalWidth / 2;
        }
        default:
          return 0;
      }
    }
    return 0;
  };

  return (
    <div
      style={{
        width: calculateLineWidth(),
        backgroundColor: branchLineItemColor,
        position: "relative",
        left: calculateLineOffset(),
      }}
    ></div>
  );
}
