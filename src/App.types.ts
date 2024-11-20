interface ImageAlternativeSlugs {
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
  ja: string;
  ko: string;
  pt: string;
}

interface ImageLinks {
  download: string;
  download_location: string;
  html: string;
  self: string;
}

interface TopicSubmissions {
  [key: string]: { status: string; approved_on?: string };
}

interface ImageUrls {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
}

interface UserLinks {
  followers: string;
  following: string;
  html: string;
  likes: string;
  photos: string;
  portfolio: string;
  self: string;
}

interface UserProfileImage {
  large: string;
  medium: string;
  small: string;
}

interface UserSocial {
  instagram_username: string | null;
  paypal_email: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
}

interface User {
  accepted_tos: boolean;
  bio: string | null;
  first_name: string;
  for_hire: boolean;
  id: string;
  instagram_username: string | null;
  last_name: string | null;
  links: UserLinks;
  location: string | null;
  name: string;
  portfolio_url: string | null;
  profile_image: UserProfileImage;
  social: UserSocial;
  total_collections: number;
  total_illustrations: number;
  total_likes: number;
  total_photos: number;
  total_promoted_illustrations: number;
  total_promoted_photos: number;
  twitter_username: string | null;
  updated_at: string;
  username: string;
}

export interface Image {
  alt_description: string;
  alternative_slugs: ImageAlternativeSlugs;
  asset_type: string;
  blur_hash: string;
  breadcrumbs: unknown[];
  color: string;
  created_at: string;
  current_user_collections: unknown[];
  description: string | null;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: ImageLinks;
  promoted_at: string | null;
  slug: string;
  sponsorship: null;
  topic_submissions: TopicSubmissions;
  updated_at: string;
  urls: ImageUrls;
  user: User;
  width: number;
}

export interface ImgInfo {
  regular: string;
  alt: string;
  likes: number;
  description: string | null;
  user: string;
}
