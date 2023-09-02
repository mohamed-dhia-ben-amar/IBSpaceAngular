import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../Services/post.service';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Interfaces/interfaces';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  @Input() post: Post = {} as Post;

  route: ActivatedRoute = inject(ActivatedRoute);
  postID = "";

  constructor(
    private http: HttpClient,
    private service: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.postID = this.route.snapshot.params['id'];
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['post']) {
      this.post = state['post'];
    } else {
      // If the post data is not in the router state, fetch it from the API using the ID
      this.service.getPostById(this.postID).subscribe(
        (post) => {
          this.post = post;
        },
        error => {
          console.error("Error:", error);
        }
      );
    }
  }

  EditPost(Body: string) {
    this.service.EditPost(this.postID, Body).subscribe(
      () => {
        this.router.navigate(['postDetail', this.postID])
      },
      (error) => {
        // An error occurred
        console.error('Error editing post:', error);
      }
    );
    this.router.navigate(['home'])
  }

  BackToPost() {
    this.router.navigate(['postDetail', this.postID])
  }
}
