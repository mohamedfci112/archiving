import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './shared/login/login.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { PageComponent } from './components/page/page.component';
import { AddfileComponent } from './components/addfile/addfile.component';
import { ViewfileComponent } from './components/viewfile/viewfile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from './services/file.service';
import { UserService } from './services/user.service';
import { DashboardService } from './services/dashboard.service';
import { AuthguardGuard } from './auth/authguard.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { TrashComponent } from './components/trash/trash.component';
import { AssignfilesComponent } from './components/assignfiles/assignfiles.component';
import { AutomatesComponent } from './components/automates/automates.component';
import { HistoryComponent } from './components/history/history.component';
import { SittingComponent } from './components/sitting/sitting.component';
import { BackupComponent } from './components/backup/backup.component';

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'viewfiles', component: ViewfileComponent, canActivate: [AuthguardGuard]},
  { path: 'page/:id', component: PageComponent, canActivate: [AuthguardGuard]},
  { path: 'trash', component: TrashComponent, canActivate: [AuthguardGuard]},
  { path: 'assignFiles', component: AssignfilesComponent, canActivate: [AuthguardGuard]},
  { path: 'automates', component: AutomatesComponent, canActivate: [AuthguardGuard]},
  { path: 'history', component: HistoryComponent, canActivate: [AuthguardGuard]},
  { path: 'backup', component: BackupComponent, canActivate: [AuthguardGuard]},
  { path: 'sitting', component: SittingComponent, canActivate: [AuthguardGuard]},
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavigationComponent,
    PageComponent,
    AddfileComponent,
    ViewfileComponent,
    TrashComponent,
    AssignfilesComponent,
    AutomatesComponent,
    HistoryComponent,
    SittingComponent,
    BackupComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
  providers: [
    FileService,
    UserService,
    DashboardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
