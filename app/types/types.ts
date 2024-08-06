export type CloudinaryResult = {
  imgName: string | undefined;
  imageUrl: any;
  id: string;
  batchId: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  path: string;
  thumbnail_url: string;
};

export type AlbumType = {
  id: number;
  albumName: string;
  created_at: string;
  albums: CloudinaryResult[];
};

export type LoginRequest = {
  email: string;
  password: string;
}

export type User = {
  email: string;
  sessionToken: string;
  id: number;
}
