import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDataStore } from "../../store/dataStore";
import "./ReactHierarchy.css";
import { useLayoutStore } from "../../store/layoutStore";
import { AppConfigType } from "../../types/app-config.types";
import { APP_CONFIG } from "../../app.config";
import { useCardLayerStore } from "../../store/cardLayerStore";
import { findFirstNodeWithChildrenById } from "../../util/node.util";

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
  const setCardHeight = useLayoutStore((s) => s.setCardHeight);
  const setCardWidth = useLayoutStore((s) => s.setCardWidth);
  const setCardSpace = useLayoutStore((s) => s.setCardSpace);

  // card layer store
  const cardLayer_A_Data = useCardLayerStore((s) => s.cardLayer_A_Data);
  const cardLayer_B_Data = useCardLayerStore((s) => s.cardLayer_B_Data);
  const setCardLayer_A_Data = useCardLayerStore((s) => s.setCardLayer_A_Data);
  const setCardLayer_B_Data = useCardLayerStore((s) => s.setCardLayer_B_Data);

  useEffect(() => {
    setCardHeight(appConfig.layout.card.cardHeight);
    setCardWidth(appConfig.layout.card.cardWidth);
    setCardSpace(appConfig.layout.card.cardSpace);
  }, [appConfig, setCardHeight, setCardWidth, setCardSpace]);

  useEffect(() => {
    // console.log("data", data);
    setCardLayer_A_Data([data]);
    console.log("layer-b-???:");
    const layer_B_children = findFirstNodeWithChildrenById(data, data.id) || [];
    console.log("layer_B_children", layer_B_children);
    setCardLayer_B_Data(layer_B_children);
  }, [data, setCardLayer_A_Data, setCardLayer_B_Data]);

  console.log("cardLayer_A_Data", cardLayer_A_Data);
  console.log("cardLayer_B_Data", cardLayer_B_Data);

  return (
    <div className="react-hierarchy">
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
          HEADER
        </div>
        <div className="layer-a">
          <div className="layer-content">
            <div className="layer-content-main" style={{ height: cardHeight }}>
              cards
            </div>
            <div
              className="layer-content-branch"
              style={{
                height: branchHeight,
                backgroundColor: branchBackgroundColor,
              }}
            >
              branch
            </div>
          </div>
        </div>
        <div className="layer-b">
          <div className="layer-content">
            <div className="layer-content-main" style={{ height: cardHeight }}>
              cards
            </div>
            <div
              className="layer-content-branch"
              style={{
                height: branchHeight,
                backgroundColor: branchBackgroundColor,
              }}
            >
              branch
            </div>
          </div>
        </div>
        <div className="layer-c">
          <div className="layer-content">
            <div className="layer-content-main" style={{ height: cardHeight }}>
              cards
            </div>
            <div
              className="layer-content-branch"
              style={{
                height: branchHeight,
                backgroundColor: branchBackgroundColor,
              }}
            >
              branch
            </div>
          </div>
        </div>
        {/* Debug */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  );
}
