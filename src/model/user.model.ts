export interface BaseUser {
  username: string;
}

export type RatedUser = Pick<BaseUser, 'username'>;