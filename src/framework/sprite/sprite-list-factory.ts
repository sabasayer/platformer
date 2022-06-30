import { Dimension } from "../game-object/types/dimension";
import { Sprite } from "./sprite";

class SpriteListFactory {
    createFromHorizontalSheet(
        url: string,
        oneItemDimension: Dimension,
        totalCount: number
    ): Sprite[] {
        const list: Sprite[] = [];
        for (let i = 0; i < totalCount; i++) {
            list.push(
                new Sprite(url, {
                    ...oneItemDimension,
                    x: i * oneItemDimension.width,
                    y: 0,
                })
            );
        }
        return list;
    }

    createFromUrls(urls: string[]) {
        return urls.map((url) => new Sprite(url));
    }
}

export const spriteListFactory = new SpriteListFactory();
