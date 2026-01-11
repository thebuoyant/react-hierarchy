import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDataStore } from "../../store/dataStore";
import "./ReactHierarchy.css";
import { useLayoutStore } from "../../store/layoutStore";
import { AppConfigType } from "../../types/app-config.types";
import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import {
  findFirstNodeWithChildrenById,
  getChildrenOfFirstNodeWithChildren,
  getFirstFilledNodeChildrenItem,
} from "../../util/node.util";
import LayerACards from "../layer-cards/LayerACards";
import LayerBCards from "../layer-cards/LayerBCards";
import LayerCCards from "../layer-cards/LayerCCards";
import HeaderNav from "../header-nav/HeaderNav";
import LayerABranch from "../layer-a-branch/LayerABranch";
import LayerBBranch from "../layer-b-branch/LayerBBranch";

export type ReactHierarchyProps = {
  title?: string;
  showTitle?: boolean;
  titleType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  appConfig: AppConfigType;
};

export default function ReactHierarchy({
  title = "React Hierarchy",
  showTitle = true,
  titleType = "h3",
  appConfig = APP_CONFIG,
}: ReactHierarchyProps) {
  // data store
  const data = useDataStore((s) => s.data);

  // layout store
  const headerHeight = useLayoutStore((s) => s.headerHeight);
  const branchHeight = useLayoutStore((s) => s.branchHeight);
  const branchBackgroundColor = useLayoutStore((s) => s.branchBackgroundColor);
  const cardHeight = useLayoutStore((s) => s.cardHeight);
  const cardWidth = useLayoutStore((s) => s.cardWidth);
  const cardSpace = useLayoutStore((s) => s.cardSpace);
  const setCardHeight = useLayoutStore((s) => s.setCardHeight);
  const setCardWidth = useLayoutStore((s) => s.setCardWidth);
  const setCardSpace = useLayoutStore((s) => s.setCardSpace);

  // card layer store
  const setRootNode = useCardLayerStore((s) => s.setRootNode);

  const setCardLayer_A_Data = useCardLayerStore((s) => s.setCardLayer_A_Data);
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);
  const setCardLayer_C_Data = useCardLayerStore((s) => s.setCardLayer_C_Data);

  const setConnectedNodeIdLayerA = useCardLayerStore(
    (s) => s.setConnectedNodeIdLayerA
  );
  const setConnectedNodeIdLayerB = useCardLayerStore(
    (s) => s.setConnectedNodeIdLayerB
  );
  const setConnectedNodeIdLayerC = useCardLayerStore(
    (s) => s.setConnectedNodeIdLayerC
  );

  // set data
  useEffect(() => {
    setCardHeight(appConfig.layout.card.cardHeight);
    setCardWidth(appConfig.layout.card.cardWidth);
    setCardSpace(appConfig.layout.card.cardSpace);
  }, [appConfig, setCardHeight, setCardWidth, setCardSpace]);

  useEffect(() => {
    setRootNode(data);

    setCardLayer_A_Data([data]);

    const layer_B_children = findFirstNodeWithChildrenById(data, data.id) || [];
    setCardLayer_B_Data(layer_B_children);

    const layer_C_children =
      getChildrenOfFirstNodeWithChildren(layer_B_children);
    setCardLayer_C_Data(layer_C_children);

    const firstConnectedChildrenLayer_A_NodeId = getFirstFilledNodeChildrenItem(
      [data]
    )?.id;
    const firstConnectedChildrenLayer_B_NodeId =
      getFirstFilledNodeChildrenItem(layer_B_children)?.id;
    const firstConnectedChildrenLayer_C_NodeId =
      getFirstFilledNodeChildrenItem(layer_C_children)?.id;

    setConnectedNodeIdLayerA(firstConnectedChildrenLayer_A_NodeId || "");
    setConnectedNodeIdLayerB(firstConnectedChildrenLayer_B_NodeId || "");
    setConnectedNodeIdLayerC(firstConnectedChildrenLayer_C_NodeId || "");
  }, [
    data,
    setCardLayer_A_Data,
    setCardLayer_B_Data,
    setCardLayer_C_Data,
    setRootNode,
    setConnectedNodeIdLayerA,
    setConnectedNodeIdLayerB,
    setConnectedNodeIdLayerC,
  ]);

  const totalWidth =
    (2 * cardSpace + cardWidth) * APP_CONFIG.default.maxNumberOfCardsPerLayer;

  return (
    <div className="react-hierarchy" style={{ width: totalWidth }}>
      {showTitle && (
        <Typography className="hierarchy-title" variant={titleType}>
          {title}
        </Typography>
      )}

      <div className="content-wrapper">
        <div
          className="header-layer"
          style={{
            height: headerHeight,
          }}
        >
          <HeaderNav />
        </div>
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
              style={{
                height: branchHeight,
                backgroundColor: branchBackgroundColor,
              }}
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
              style={{
                height: branchHeight,
                backgroundColor: branchBackgroundColor,
              }}
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
