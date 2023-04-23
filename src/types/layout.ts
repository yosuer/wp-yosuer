interface MenuItem {
  ID: number;
  children: any[];
  pageID: number;
  pageSlug: string;
  title: string;
  url: string;
}

export interface Header {
  favicon: string;
  headerMenuItems: MenuItem[];
  siteDescription: string;
  siteLogoUrl: string;
  siteTitle: string;
}

export interface Footer {
  socialLinks: any[];
  copyrightText: boolean;
  sidebarOne: string;
  sidebarTwo: string;
  footerMenuItems: MenuItem[];
}

export interface HeaderAndFooter {
  header: Header;
  footer: Footer;
}
