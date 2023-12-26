import { ITour } from '../interfaces/tour';

export class TourDto implements ITour {
    name: string
    description: string
    tourOperator: string
    price: string
    img: string
    id: string
    type: string
    date: string
    country: string
    city: string
    tourId: any
    
    constructor(name, country, city, description, tourOperator, price, img) {
        this.name = name;
        this.country = country;
        this.city = city;
        this.description = description;
        this.tourOperator = tourOperator;
        this.price = price;
        this.img = img;
    }
}