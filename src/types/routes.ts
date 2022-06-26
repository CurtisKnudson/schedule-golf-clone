// Interface to define React-Router routes
export interface Routes {
  id: number;
  name: string;
  path?: string;
  element: JSX.Element;
  isIndex?: boolean;
  breadcrumb?: string;
}
