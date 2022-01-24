export interface MemberList {
    user: string,
    firstname: string,
    lastname: string,
    follower: number,
    follows: number
  }
  
export interface Follow {
  type: string,
  user: string,
  person_follow: string
}

export interface FollowStats {
  follows: number,
  follower: number
}
