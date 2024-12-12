import { type ConnectedViewerProps, Viewer, type ViewerAuthorizationClient, type BlankViewerProps, type WebInitializerParams } from "@itwin/web-viewer-react";

export type ConnectedViewerWebProps = ConnectedViewerProps & Required<Pick<WebInitializerParams, "authClient">>;
export type BlankViewerWebProps = BlankViewerProps & AuthClientProps;
type AuthClientProps = {
  authClient: ViewerAuthorizationClient;
  iTwinId: string;
} | {
  authClient?: ViewerAuthorizationClient;
  iTwinId?: never;
};

type ViewerWrapperProps = {
  webInitProps: WebInitializerParams,
  blankViewerProps: BlankViewerWebProps
  connectedViewerProps?: ConnectedViewerWebProps,
}

export const ViewerWrapper = (
  {
    webInitProps,
    blankViewerProps,
    connectedViewerProps
  }: ViewerWrapperProps
) => {
  if (connectedViewerProps ) {
    return (
      <Viewer
        {...webInitProps}
        {...connectedViewerProps}
      />
    );
  }

  return (
    <Viewer
      {...webInitProps}
      {...blankViewerProps}
    />
  );
};