import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggerService } from 'src/app/service-logger/logger.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) {}

    ngOnInit() {}

    logout(){
        this.dataService.logout()
        this.router.navigate(['/'])
    }
}

