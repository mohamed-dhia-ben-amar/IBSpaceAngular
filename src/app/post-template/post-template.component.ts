import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from '../Interfaces/interfaces';
import { PostService } from '../Services/post.service';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css']
})
export class PostTemplateComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private destroy$: Subject<void> = new Subject<void>(); // Create a Subject to track component destruction
  private countryID: string = ""; // Store the current CountryID in a private variable
  postVisibilityMap: Map<string, boolean> = new Map<string, boolean>();

  constructor(
    private http: HttpClient,
    private service: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCountryID(); // Get the initial CountryID
    this.getPosts(); // Get the initial posts list
  }

  ngOnDestroy() {
    this.destroy$.next(); // Trigger the Subject to indicate that the component is being destroyed
    this.destroy$.complete(); // Unsubscribe from the Subject
  }

  togglePostBody(postId: string): void {
    const currentVisibility = this.postVisibilityMap.get(postId);
    this.postVisibilityMap.set(postId, !currentVisibility);
  }

  isPostBodyVisible(postId: string): boolean {
    return this.postVisibilityMap.get(postId) || false;
  }

  getPosts(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const CountryID = localStorage.getItem("CountryID")!

      this.service.getPostListByCountry(CountryID).subscribe(
        (data: any) => {
          this.posts = data.posts;
          resolve();
        },
        (error: any) => {
          console.error("Error:", error);
          reject(error);
        }
      );
    });
  }

  getCountryID(): void {
    this.countryID = localStorage.getItem("CountryID")!;
    // Subscribe to changes in the CountryID
    this.service.countryIDChanged.pipe(takeUntil(this.destroy$))
      .subscribe(
        (newCountryID: string) => {
          this.countryID = newCountryID;
          this.getPosts(); // When the CountryID changes, repopulate the posts array
        }
      );
  }

  getFromLocalStorage(key: string): any {
    if (localStorage.getItem(key) != undefined) {
      return localStorage.getItem(key);
    } else {
      return "";
    }
  }

  showPostDetail(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.service.getPostById(id).subscribe(
        (post: Post) => {
          this.router.navigate(['post-detail', id]);
          resolve();
        },
        (error: any) => {
          console.error("Error:", error);
          reject(error);
        }
      );
    });
  }

}
