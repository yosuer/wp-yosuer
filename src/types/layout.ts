interface HeaderMenuItem {
  ID: number;
  title: string;
  url: string;
  children: any[];
  pageSlug: string;
  pageID: number;
}

export interface Header {
  favicon: string;
  headerMenuItems: HeaderMenuItem[];
  siteDescription: string;
  siteLogoUrl: string;
  siteTitle: string;
}

export interface HeaderAndFooter {
  header: Header;
  footer: any;
}
