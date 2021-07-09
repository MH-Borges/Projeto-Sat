import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseSat } from 'src/app/models/base.model';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ListSats?: BaseSat[];
  currentList: BaseSat = {};
  currentIndex = -1;
  nome = '';

  constructor(private baseService: BaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.retrieve();
  }

  retrieve(): void {
    this.baseService.getAll()
      .subscribe(
        data => {
          this.ListSats = data;
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieve();
    this.currentList = {};
    this.currentIndex = -1;
  }

  removeAll(): void {
    this.baseService.deleteAll()
      .subscribe(
        response => {
          this.refreshList();
          this.router.navigate(['/Index'])
        },
        error => {
          console.log(error);
        });
  }

  searchNome(): void {
    this.currentList = {};
    this.currentIndex = -1;

    this.baseService.findByTitle(this.nome)
      .subscribe(
        data => {
          this.ListSats = data;
        },
        error => {
          console.log(error);
        });
  }
}