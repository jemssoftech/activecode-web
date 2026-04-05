// types/industry.ts
export interface IndustryItem {
  id: number;
  icon: string;
  name: string;
  description?: string;
  color?: string;
}

export interface IndustriesSectionHeader {
  title: string;
  highlight: string;
  description?: string;
}

export interface IndustriesData {
  sectionHeader: IndustriesSectionHeader;
  items: IndustryItem[];
}