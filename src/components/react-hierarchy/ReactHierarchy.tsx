import React from "react";
import { Typography } from "@mui/material";
import { useDataStore } from "../../store/dataStore";
import "./ReactHierarchy.css";

export type ReactHierarchyProps = {
  title?: string;
  showTitle?: boolean;
  titleType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function ReactHierarchy({
  title = "React Hierarchy",
  showTitle = true,
  titleType = "h3",
}: ReactHierarchyProps) {
  const data = useDataStore((s) => s.data);

  return (
    <div className="react-hierarchy">
      {showTitle && (
        <Typography variant={titleType} gutterBottom>
          {title}
        </Typography>
      )}

      <div className="content-wrapper">
        <div className="layer-a">Layer-a</div>
        <div className="layer-b">Layer-b</div>
        <div className="layer-c">Layer-c</div>
        {/* Debug */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  );
}
