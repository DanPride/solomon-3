import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Bug } from './bug';
import { BugService } from './bugs.service';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {
  bug: Bug;

  constructor(
    private bugService: BugService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.bugService.getBug(+params['Id']))
      .subscribe(bug => this.bug = bug);
  }

  save(): void {
    this.bugService.update(this.bug)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

