export interface Shape {
    name: string;
    x: number;
    y: number;
    radius?: number|undefined;
    id:string
  }
  export interface SLD {
    sldId: string;
    sldName: string;
    plantId: string;
    plantName: string;
    blocks: Blocks[];
  }
   
  export interface Blocks {
    id: string;
    name: string;
    x: number;
    y: number;
    elements: Assets[];
  }
   
  export interface Assets {
    id: string;
    name: string;
    x? : number;
    y?: number;
    status: string;
    connectedTo: ParentAssets[];
    parameters : Parameters[];
  }
   
  export interface ParentAssets{
    id: string,
    connection_type: string
  }

  export interface Parameters{
    key : string;
    value : string;
  }