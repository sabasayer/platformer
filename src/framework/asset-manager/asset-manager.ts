import { getAsset } from "../helper/index";
import { Cachable } from "./cachable";

class AssetManager {
    private images = new Cachable<HTMLImageElement>();
    private sounds = new Cachable<HTMLAudioElement>();
    private loadings = new Set<string>();

    loadImage(url: string) {
        let image = this.images.get(url);
        if (image) return image;

        this.loadings.add(url);

        image = new Image();
        image.src = getAsset(url);
        this.images.add(url, image);

        image.onload = () => {
            this.loadings.delete(url);
        };

        image.onerror = (e) => {
            console.error("Image load error", e);
            this.images.delete(url);
            this.loadings.delete(url);
        };

        return image;
    }

    loadSound(url: string, volume: number = 1) {
        let audio = this.sounds.get(url);
        if (audio) return audio;

        this.loadings.add(url);

        audio = new Audio(getAsset(url));
        audio.volume = volume;
        this.sounds.add(url, audio);

        audio.onload = () => {
            this.loadings.delete(url);
        };

        audio.onerror = (e) => {
            console.error("Sound load error", e);
            this.sounds.delete(url);
            this.loadings.delete(url);
        };

        return audio;
    }
}

export const assetManager = new AssetManager();
