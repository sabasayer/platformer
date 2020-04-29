export class Sprite {
    private imageUrls: string[] = [];
    images: HTMLImageElement[] = [];

    constructor(imageUrls?: string[]) {
        imageUrls && this.setImageUrls(imageUrls);
    }

    setImageUrls(imageUrls: string[]) {
        this.imageUrls = imageUrls;
        this.imageUrls.forEach((e) => {
            this.addImage(e);
        });
    }

    addImage(url: string) {
        let image = new Image();
        image.src = url;
        image.onload = () => {
            this.images.push(image);
        };
    }
}
