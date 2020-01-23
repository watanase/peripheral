class Comment < ApplicationRecord
  # ユーザー
  belongs_to :user
  # 投稿
  belongs_to :post

  validates :content, presence: true

end
