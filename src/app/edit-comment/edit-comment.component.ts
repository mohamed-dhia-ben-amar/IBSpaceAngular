import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment, Post } from '../Interfaces/interfaces';
import { PostService } from '../Services/post.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent {

  @Input() comment: Comment = {} as Comment;

  route: ActivatedRoute = inject(ActivatedRoute);
  commentID = "";
  postID = "";
  commentBody = "";

  constructor(
    private http: HttpClient,
    private service: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.commentID = this.route.snapshot.params['idComment'];
    this.postID = this.route.snapshot.params['idPost'];
    this.commentBody = this.route.snapshot.params['CommentBody'];
  }

  EditComment(commentBody: string) {
    this.service.EditComment(this.commentID, commentBody).subscribe((response) => {
      // Request was successful
      this.router.navigate(['postDetail', this.postID])
    },
      (error) => {
        // An error occurred
        console.error('Error adding comment:', error);
      }
    );
  }
  
  BackToPost() {
    this.router.navigate(['postDetail', this.postID])
  }

}
