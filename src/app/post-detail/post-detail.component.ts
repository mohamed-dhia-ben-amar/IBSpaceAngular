import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment, Post } from '../Interfaces/interfaces';
import { PostService } from '../Services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post = {} as Post;
  comments: Comment[] = [];
  showPopup = false;

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
          this.service.GetListComment(this.postID).subscribe(comments => {
            this.comments = comments
          })
        },
        error => {
          console.error("Error:", error);
        }
      );
    }
  }

  AddComment(commentBody: string) {
    this.service.AddCommentToPost(this.postID, commentBody).subscribe((response) => {
      // Request was successful
      this.router.navigate(['postDetail', this.postID])
      window.location.reload()
    },
      (error) => {
        // An error occurred
        console.error('Error adding comment:', error);
      }
    );
  }

  deleteComment(IDComment: string) {
    this.service.DeleteCommentFromPost(IDComment).subscribe((response) => {
      // Request was successful
      this.router.navigate(['postDetail', this.postID])
      window.location.reload()
    },
      (error) => {
        // An error occurred
        console.error('Error deleting comment:', error);
      }
    );
  }

  deletePost(IDPost: string) {
    this.service.DeletePost(IDPost).subscribe((response) => {
      // Request was successful
      this.router.navigate(['home'])
    },
      (error) => {
        // An error occurred
        console.error('Error deleting post:', error);
      }
    );
  }

}


