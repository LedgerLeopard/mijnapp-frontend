import { Component, OnInit } from '@angular/core';
import { ContractService } from './contract.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-similarities',
  templateUrl: './similarities.component.html',
  styleUrls: ['./similarities.component.scss']
})
export class SimilaritiesComponent implements OnInit {
  contracts: any;
  constructor(private contractService: ContractService, private toastr: ToastrService, private router: Router ) { }

  ngOnInit() {
    this.contractService.getContracts().then(res => {
      this.contracts = res;
    }).catch(e => this.toastr.error(e['message']));
  }

  backPage() {
    this.router.navigate(["homepage"]);
  }
}
