import { TestBed } from '@angular/core/testing';

import { CommodityServiceService } from './commodity-service.service';

describe('CommodityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommodityServiceService = TestBed.get(CommodityServiceService);
    expect(service).toBeTruthy();
  });
});
