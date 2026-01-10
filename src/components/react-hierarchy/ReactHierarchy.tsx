import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDataStore } from "../../store/dataStore";
import "./ReactHierarchy.css";
import { useLayoutStore } from "../../store/layoutStore";
import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import {
  findFirstNodeWithChildrenById,
  getChildrenOfFirstNodeWithChildren,
} from "../../util/node.util";
import LayerACards from "../layer-cards/LayerACards";
import LayerBCards from "../layer-cards/LayerBCards";
import LayerCCards from "../layer-cards/LayerCCards";
import HeaderNav from "../header-nav/HeaderNav";
import LayerABranch from "../layer-a-branch/LayerABranch";
import LayerBBranch from "../layer-b-branch/LayerBBranch";

export default function ReactHierarchy() {
  const data = useDataStore((s) => s.data);
  const appConfig = APP_CONFIG;

  const cardHeight = useLayoutStore((s) => s.cardHeight);
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);
  const branchHeight = useLayoutStore((s) => s.branchHeight);

  const setCardHeight = useLayoutStore((s) => s.setCardHeight);
  const setCardWidth = useLayoutStore((s) => s.setCardWidth);
  const setCardSpace = useLayoutStore((s) => s.setCardSpace);

  const setRootNode = useCardLayerStore((s) => s.setRootNode);

  const setCardLayer_A_Data = useCardLayerStore((s) => s.setCardLayer_A_Data);
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);

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
  const setCardLayer_C_SelectedIndexNumber = useCardLayerStore(
    (s) => s.setCardLayer_C_SelectedIndexNumber
  );

  useEffect(() => {
    setCardHeight(appConfig.layout.card.cardHeight);
    setCardWidth(appConfig.layout.card.cardWidth);
    setCardSpace(appConfig.layout.card.cardSpace);
  }, [appConfig, setCardHeight, setCardWidth, setCardSpace]);

  useEffect(() => {
    // Root init
    setRootNode(data);

    // Layer A shows just root node (as list with one item)
    setCardLayer_A_Data([data]);

    const layer_B_children = findFirstNodeWithChildrenById(data, data.id) || [];
    setCardLayer_B_Data(layer_B_children);

    const layer_C_children =
      getChildrenOfFirstNodeWithChildren(layer_B_children);
    setCardLayer_C_Data(layer_C_children);

    // ✅ reset window + selection indices (super important for stable UX)
    setCardLayer_A_FirstItemIndexNumber(0);
    setCardLayer_B_FirstItemIndexNumber(0);
    setCardLayer_C_FirstItemIndexNumber(0);

    setCardLayer_A_SelectedIndexNumber(0);
    setCardLayer_B_SelectedIndexNumber(0);
    setCardLayer_C_SelectedIndexNumber(0);
  }, [
    data,
    setCardLayer_A_Data,
    setCardLayer_B_Data,
    setCardLayer_C_Data,
    setRootNode,
    setCardLayer_A_FirstItemIndexNumber,
    setCardLayer_B_FirstItemIndexNumber,
    setCardLayer_C_FirstItemIndexNumber,
    setCardLayer_A_SelectedIndexNumber,
    setCardLayer_B_SelectedIndexNumber,
    setCardLayer_C_SelectedIndexNumber,
  ]);

  const totalWidth =
    (2 * cardSpace + cardWidth) * APP_CONFIG.default.maxNumberOfCardsPerLayer;

  return (
    <div className="react-hierarchy" style={{ width: totalWidth }}>
      <Typography variant="h1" style={{ marginBottom: 24 }}>
        React Hierarchy
      </Typography>

      <div className="header-nav-container" style={{ height: 48 }}>
        <HeaderNav />
      </div>

      <div className="layers">
        <div className="layer-a">
          <div
            className="layer-content"
            style={{ height: cardHeight + branchHeight }}
          >
            <div className="layer-content-main" style={{ height: cardHeight }}>
              <LayerACards />
            </div>

            <div
              className="layer-content-branch"
              style={{ height: branchHeight }}
            >
              <LayerABranch />
            </div>
          </div>
        </div>

        <div className="layer-b">
          <div
            className="layer-content"
            style={{ height: cardHeight + branchHeight }}
          >
            <div className="layer-content-main" style={{ height: cardHeight }}>
              <LayerBCards />
            </div>

            <div
              className="layer-content-branch"
              style={{ height: branchHeight }}
            >
              <LayerBBranch />
            </div>
          </div>
        </div>

        <div className="layer-c">
          <div
            className="layer-content"
            style={{ height: cardHeight + branchHeight }}
          >
            <div className="layer-content-main" style={{ height: cardHeight }}>
              <LayerCCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
