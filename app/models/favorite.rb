class Favorite < ApplicationRecord
  # ユーザー
  belongs_to :user
  # 投稿
  belongs_to :post
end
