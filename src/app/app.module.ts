import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlagListDialogComponent } from './flag-list-dialog/flag-list-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginOptionsDialogComponent } from './login-options-dialog/login-options-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { PostTemplateComponent } from './post-template/post-template.component';
import { MatIconModule } from '@angular/material/icon';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, getApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './Services/authentication.service';
import { Auth } from '@angular/fire/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthGuardModule } from '@angular/fire/auth-guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const firebaseConfig = {
  apiKey: "AIzaSyBSWtIcrAGRB2UUnj96wTw2UUN9M70f6y4",
  authDomain: "ib-space.firebaseapp.com",
  projectId: "ib-space",
  storageBucket: "ib-space.appspot.com",
  messagingSenderId: "733640787725",
  appId: "1:733640787725:web:0b33d1f82103bb52ab9244",
  measurementId: "G-K80Z330M94"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginOptionsDialogComponent,
    HomeComponent,
    FlagListDialogComponent,
    PostTemplateComponent,
    PostDetailComponent,
    AddPostComponent,
    SignupComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    AuthGuardModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }