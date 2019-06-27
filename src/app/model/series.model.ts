import { Image } from './shared.interface'
import { ImageGenerator } from './image-generator.model'

export class SeriesModel {
    constructor(public id: number, public title: string, public description: string, public thumbnail: Image) {}

    get image() {
        return new ImageGenerator(this.thumbnail.path, this.thumbnail.extension)
    }

    get linkToDetails() {
        return ['/series', this.id]
    }
}
