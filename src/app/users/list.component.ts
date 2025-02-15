﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '@app/_services';

@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users?: any[];

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe(
        (users) => (this.users = users));

  }

  deleteUser(id: string) {
    const user = this.users!.find((x) => x.id === id);
    user.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.users = this.users!.filter((x) => x.id !== id)));
  }
}
