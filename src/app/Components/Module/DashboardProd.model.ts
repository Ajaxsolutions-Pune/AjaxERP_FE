import { DashboardProdCount } from './DashboardProdCount.model';
import { DashboardProdNextDay } from './DashboardProdNextDay.model';

export class DashboardProd {
    ProductionDate: string;
    BranchNo: number;
    EmpId: number;
    EmpName: string;
    WorkingHrs: number;
    TargetQty: number;
    RejQty: number;
    OKTotal: number;
    TotalQty: number;
    ShortPDN: number;
    Status: number;
    lstDBCount: DashboardProdCount[];
    lstNexDay: DashboardProdNextDay[];
}
