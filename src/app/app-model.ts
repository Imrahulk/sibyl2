export interface User {
  id: string;
  username: string;
}

export interface Post {
  id: string;
  caption?: string; // Optional, as some entries might not have a caption
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}
