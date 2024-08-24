export interface Shape {
    name: string;
    x: number;
    y: number;
    radius?: number|undefined;
    id:string
  }
  export interface Plant {
    id: string;
    name: string;
    type: string;
    blocks: Blocks[];
  }
   
  export interface Blocks {
    id: string;
    type: string;
    name: string;
    x: number;
    y: number;
    elements: Assets[];
  }
   
  export interface Assets {
    id: string;
    type:string,
    name: string;
    status: string;
    connectedTo: ParentAssets[];
  }
   
  export interface ParentAssets{
    id: string,
    connection_type: string
  }