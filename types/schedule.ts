export interface Schedule {
  id: Number;
  user_id: Number;
  title: string;
  description: string;
  event_date: Date;
  area: string;
  apply_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  apply_user_id: Number; // ハッカソン用（本番はappliesテーブルでN:Nにする）
}
