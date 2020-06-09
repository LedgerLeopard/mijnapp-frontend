import { Component, OnInit, Input } from '@angular/core';
import { ContractService } from '../contract.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-similarities-overview',
  templateUrl: './similarities-overview.component.html',
  styleUrls: ['./similarities-overview.component.scss']
})
export class SimilaritiesOverviewComponent implements OnInit {
  contract: any;
  contractId: any;
  constructor(private contractService: ContractService, private toastr: ToastrService, private activatedRoute: ActivatedRoute, 
      private router: Router) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.contractId =params.id;
    });
  }

  ngOnInit() {
    this.contractService.getContracts().then((res:any) => {
      this.contract = res.find(x => x['identificatie'] ==  this.contractId);
    }).catch(e => this.toastr.error(e['message']));
  }

  backPage() {
    this.router.navigate(["/homepage/similarities"]);
  }
}
