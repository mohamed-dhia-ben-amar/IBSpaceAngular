import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SignupComponent } from './signup/signup.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/compat/auth-guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin), },
  { path: 'postDetail/:id', component: PostDetailComponent, ...canActivate(redirectUnauthorizedToLogin), },
  { path: 'addPost', component: AddPostComponent, ...canActivate(redirectUnauthorizedToLogin), },
  { path: 'signup', component: SignupComponent, ...canActivate(redirectLoggedInToHome), },
  { path: 'verifyEmail/:email', component: VerifyEmailComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
