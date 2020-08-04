import { ImageDimension } from "~/src/framework/utils/image-dimension.interface";

export interface SpriteAtlasMap{
    [key:string] : ImageDimension[]
}
