export interface Post {
  post_id: string,
  user_id: string,
  author: string,
  content: string,
  timestamp:  string,
  votes: number,
  up: string,
  down: string,
}

export interface OnlineList {
  email: string,
  firstname: string,
  lastname: string
}

export interface Vote {
  post_id: string,
  type: string,
  user: string,
}

export interface FollowData {
  follows: string,
  follower: string
}
