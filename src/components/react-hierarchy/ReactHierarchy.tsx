import React from "react";
import { Typography } from "@mui/material";

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
  return (
    <div className="react-hierarchy">
      {showTitle && (
        <Typography variant={titleType} gutterBottom>
          {title}
        </Typography>
      )}
      <div className="content-wrapper"></div>
    </div>
  );
}
