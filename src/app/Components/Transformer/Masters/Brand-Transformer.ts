import { BrandService } from '../../Services/Masters/BrandService';
import { Brand  } from '../../Module/Masters/Brand.model';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandTransformer {

    brand: Brand;
    constructor(
        private brandService: BrandService) {
    }
}
