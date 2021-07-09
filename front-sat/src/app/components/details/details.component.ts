import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseSat } from 'src/app/models/base.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  currentBase: BaseSat = {
    nome: '',
    funcao: '',
  };
  message = '';

  constructor(
    private baseService: BaseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getBase(this.route.snapshot.params.id);
  }

  getBase(id: string): void {
    this.baseService.get(id)
      .subscribe(
        data => {
          this.currentBase = data;
        },
        error => {
          console.log(error);
        });
  }

  update(): void {
    this.message = '';

    this.baseService.update(this.currentBase.id, this.currentBase)
      .subscribe(
        response => {
          this.message = response.message ? response.message : 'Atualizado com sucesso!!';
          setTimeout(() => this.router.navigate(['/Index']), 2000);
        },
        error => {
          console.log(error);
        });
  }

  delete(): void {
    this.baseService.delete(this.currentBase.id)
      .subscribe(
        response => {
          this.router.navigate(['/Index']);
        },
        error => {
          console.log(error);
        });
  }
}