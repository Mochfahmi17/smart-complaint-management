export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stats {
  totalCompliment: number;
  totalWaiting: number;
  totalInProgress: number;
  totalDone: number;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  category: Category;
  status: "PENDING" | "IN_PROGRESS" | "CLOSED";
  photoUrl: string;
  photo_public_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComplaintResponse {
  success: boolean;
  error: boolean;
  message: string | null;
  data: Complaint[];
}
export interface ComplaintDetailResponse {
  success: boolean;
  error: boolean;
  message: string | null;
  data: Complaint;
}

export interface CategoriesResponse {
  success: boolean;
  error: boolean;
  data: Category[];
}
export interface StatsResponse {
  success: boolean;
  error: boolean;
  data: Stats;
}
