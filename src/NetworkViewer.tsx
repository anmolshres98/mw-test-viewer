/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect, useState } from "react";
import { Auth } from "./Auth";
import { Cartographic } from "@itwin/core-common";
import { Range3d } from "@itwin/core-geometry";
import { type BlankViewerWebProps, type ConnectedViewerWebProps, ViewerWrapper } from "./ViewerWrapper";
import type { WebInitializerParams } from "@itwin/web-viewer-react";
import "./NetworkViewer.scss";

const NetworkViewer = () => {
  const authClient = Auth.getClient();
  const [connectedViewerProps, setConnectedViewerProps] = useState<ConnectedViewerWebProps>();
  const webInitProps: WebInitializerParams = {
    enablePerformanceMonitors: false,
    defaultUiConfig: {
      hideNavigationAid: false,
      hideStatusBar: false,
      hideToolSettings: true,
    },
    mapLayerOptions:{
      BingMaps: {
        key: "key",
        value: process.env.IMJS_BING_MAPS_KEY ?? "",
      },
    },
    tileAdmin: {
      cesiumIonKey: process.env.IMJS_CESIUM_ION_KEY ?? "",
    },
    theme: process.env.THEME ?? "dark",
  };
  const blankViewerProps: BlankViewerWebProps = {
    authClient,
    blankConnectionViewState: { viewFlags: { backgroundMap: true } },
    location: Cartographic.fromDegrees({
      longitude: -83.686694,
      latitude: 37.065757,
      height: 0,
    }),
    extents: new Range3d(-40000, -40000, -100, 40000, 40000, 100)
  };
  /** Sign-in */
  useEffect(() => {
    void authClient.signIn();
  }, []);

  const onButtonClick = () => {
    setConnectedViewerProps({
      authClient,
      iTwinId: process.env.IMJS_ITWIN_ID!,
      iModelId: process.env.IMJS_IMODEL_ID!
    });
  };

  return (
    <div className="viewer-container">
      <button onClick={onButtonClick}>Click this to switch Viewer</button>
      <ViewerWrapper
        webInitProps={webInitProps}
        connectedViewerProps={connectedViewerProps}
        blankViewerProps={blankViewerProps}
      />
    </div>
  );
};

export default NetworkViewer;
