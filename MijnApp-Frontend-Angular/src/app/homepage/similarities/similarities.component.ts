import {Component, OnInit} from '@angular/core';
import {ContractService} from './contract.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-similarities',
  templateUrl: './similarities.component.html',
  styleUrls: ['./similarities.component.scss']
})
export class SimilaritiesComponent implements OnInit {
  contracts: any;
  loading = false;

  constructor(
    private contractService: ContractService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.contractService.getContracts().then(res => {
      this.contracts = res;
      this.loading = false;
    }).catch(e => this.toastr.error(e['message']));
  }

  backPage() {
    this.router.navigate(['homepage']);
  }
}
