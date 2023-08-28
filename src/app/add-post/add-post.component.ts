import { Component } from '@angular/core';
import { PostService } from '../Services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  constructor(
    private postService: PostService,
    private router: Router) {

  }

  AddPost(Body: string) {
    const CountryID = localStorage.getItem("CountryID")
    this.postService.AddPost(Body, CountryID!).subscribe(
      (response) => {
        // Request was successful
        console.log('Post added successfully:', response);
      },
      (error) => {
        // An error occurred
        console.error('Error adding post:', error);
      }
    );
    this.router.navigate(['home'])
  }

  

}
