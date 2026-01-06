import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDataStore } from "../../store/dataStore";
import "./ReactHierarchy.css";
import { useLayoutStore } from "../../store/layoutStore";
import { AppConfigType } from "../../types/app-config.types";
import { APP_CONFIG } from "../../app.config";

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
  const data = useDataStore((s) => s.data);
  const headerHeight = useLayoutStore((s) => s.headerHeight);
  const branchHeight = useLayoutStore((s) => s.branchHeight);
  const branchBackgroundColor = useLayoutStore((s) => s.branchBackgroundColor);
  const cardHeight = useLayoutStore((s) => s.cardHeight);
  const setCardHeight = useLayoutStore((s) => s.setCardHeight);
  const setCardWidth = useLayoutStore((s) => s.setCardWidth);
  const setCardSpace = useLayoutStore((s) => s.setCardSpace);
  const setCardHeaderBackgroundColor = useLayoutStore(
    (s) => s.setCardHeaderBackgroundColor
  );
  const setCardHeaderTitleColor = useLayoutStore(
    (s) => s.setCardHeaderTitleColor
  );
  const setCardHeaderSubTitleColor = useLayoutStore(
    (s) => s.setCardHeaderSubTitleColor
  );

  useEffect(() => {
    console.log("APP-CONFIG", appConfig);
    console.log("set layout store from app config");
    setCardHeight(appConfig.layout.card.cardHeight);
    setCardWidth(appConfig.layout.card.cardWidth);
    setCardSpace(appConfig.layout.card.cardSpace);
    setCardHeaderBackgroundColor(
      appConfig.layout.card.cardHeaderBackgroundColor
    );
    setCardHeaderTitleColor(appConfig.layout.card.cardHeaderTitleColor);
    setCardHeaderSubTitleColor(appConfig.layout.card.cardHeaderSubTitleColor);
  }, [appConfig]);

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
