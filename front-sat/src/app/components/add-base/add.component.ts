import { Component, OnInit } from '@angular/core';
import { BaseSat } from 'src/app/models/base.model';
import { BaseService } from 'src/app/services/base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  BaseSat: BaseSat = {
    nome: '',
    funcao: '',
  };
  submitted = false;

  constructor(private Service: BaseService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  save(): void {
    const data = {
      nome: this.BaseSat.nome,
      funcao: this.BaseSat.funcao
    };

    this.Service.create(data)
      .subscribe(
        response => {
          this.submitted = true;
          setTimeout(() => this.router.navigate(['/Index']), 2000);
        },
        error => {
          console.log(error);
        });
  }

  new(): void {
    this.submitted = false;
    this.BaseSat = {
      nome: '',
      funcao: '',
    };
  }
}