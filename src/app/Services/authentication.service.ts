import { Injectable } from '@angular/core';
import { authState, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile, GoogleAuthProvider, FacebookAuthProvider, sendEmailVerification } from '@angular/fire/auth';
import { User, UserCredential } from 'firebase/auth';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = this.afAuth.authState

  constructor(private afAuth: AngularFireAuth, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      // User is successfully logged in
      const user = userCredential.user;
      if (user?.emailVerified == true) {
        // Get the user token
        user!.getIdToken()
          .then((token) => {
            // Token is obtained
            this.getToken(token).subscribe(res => {
              localStorage.setItem("Token", res.token.accesToken)
              this.router.navigate(['/home']);
            })
          })
          .catch((error) => {
          });
      } else {
        this.router.navigate(['/verifyEmail', email]);
      }
    })
      .catch((error) => {
      }));
  }

  logout() {
    return from(this.afAuth.signOut());
  }

  signUp(name: string, email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
      sendEmailVerification(res.user!)
      updateProfile(res.user!, { displayName: name })
    }, err => {
      alert(err.message);
    }))
  }

  GoogleSignIn() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['home'])
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
    }, err => {
      alert(err.message)
    })
  }

  FaceBookSignIn() {
    return this.afAuth.signInWithPopup(new FacebookAuthProvider).then(res => {
      this.router.navigate(['home'])
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
    }, err => {
      alert(err.message)
    })
  }

  ForgotPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/login']);
    }, err => {
      alert('Something went wrong');
    })
  }

  SendEmailVerification() {
    const userString = localStorage.getItem('User');
    if (userString) {
      const user = JSON.parse(userString) as User
      sendEmailVerification(user).then(() => {
        alert("Mail has been sent")
      }).catch(err => {
        alert(err.message)
      });
    } else {

    }
  }

  getToken(token: string) : Observable<any> {
    const url = `https://api.ib-space.com/api/Auth`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI2NGRhMDRiZmViMGI1MTJmYmVmYjk4ZDkiLCJqdGkiOiIyMjFlMmNkYS1jNjQ4LTQ2MTgtOGU0ZS0wMmI2OWVmZDFhMGMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI2NGRhMDRiZmViMGI1MTJmYmVmYjk4ZDkiLCJleHAiOjE3NTYzNzYzNjZ9.xng-pxJJp4EumFn3jmgmlFsX1H_V-hu0PJ45mViBuSo`,
      'Accept': '*/*',
    });

    const body = {
      token: token,
    };

    // Make the POST request
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((error) => {
        return throwError('An error occurred while fetching post list.');
      })
    );
  }

}