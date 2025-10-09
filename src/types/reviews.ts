export interface ReviewResponse {
  success: boolean;
  message: string;
  data: ReviewData[];
}

export interface ReviewData {
  _id: string;
  review: SingleReview[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SingleReview {
  text: string;
  rating: number;
  user: ReviewUser;
  _id: string;
}

export interface ReviewUser {
  avatar: {
    public_id: string;
    url: string;
  };
  _id: string;
  name: string;
}
