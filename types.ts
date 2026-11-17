
export interface Ministry {
  name: string;
  description: string;
  link: string;
}

export interface County {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  description: string;
  population: string;
  capital: string;
  highlights: Highlight[];
  payams: Payam[];
}

export interface Highlight {
  title: string;
  description: string;
  iconName: string;
}

export interface Payam {
  name: string;
  population: string;
  bomas: string[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  fee: string;
  iconName: string;
  description: string;
}

export interface Document {
  id: string;
  title: string;
  category: string;
  size: string;
  date: string;
}

export type PageRoute = 
  | '/'
  | '/government'
  | '/ministries'
  | '/services'
  | '/documents'
  | '/ces-structure'
  | '/contact'
  | '/portal'
  | '/auth/signin'
  | '/auth/signup'
  | '/services/business'
  | string;
