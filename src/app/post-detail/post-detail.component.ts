import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../Interfaces/interfaces';
import { PostService } from '../Services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post = {} as Post;

  route: ActivatedRoute = inject(ActivatedRoute);
  postID = "";

  constructor(
    private http: HttpClient,
    private service: PostService,
    private router: Router,
    //private router: RouterModule
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

}


