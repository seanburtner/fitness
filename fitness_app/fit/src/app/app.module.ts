import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutinesComponent } from './routines/routines.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { WorkoutComponent } from './workout/workout.component';
import { RoutineEditorComponent } from './routine-editor/routine-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutinesComponent,
    HistoryComponent,
    WorkoutComponent,
    LoginComponent,
    RoutineEditorComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([ // order matters - make sure more specific ones come first
      { path: 'routines', component: RoutinesComponent },
      { path: 'history', component: HistoryComponent},
      { path: 'workout', component: WorkoutComponent},
      { path: 'routineEditor', component: RoutineEditorComponent},
      { path: 'register', component: RegisterComponent},
      { path: '', component: LoginComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
