class Like < ApplicationRecord
  # ユーザー
  belongs_to :user
  # 投稿 カウント
  belongs_to :post, counter_cache: :likes_count
end