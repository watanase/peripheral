class Post < ApplicationRecord
  # ユーザー
  belongs_to :user
  # 画像
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true
  # お気に入り
  has_many :favorites, dependent: :destroy
  has_many :favorited_users, through: :favorites, source: :user
  # コメント
  has_many :comments, dependent: :destroy
  # いいね
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user

  # お気に入り判断
  def favorite_user(user_id)
    favorites.find_by(user_id: user_id)
   end
  # いいね判断
  def like_user(user_id)
    likes.find_by(user_id: user_id)
  end
  # ランキング表示
  def self.create_all_ranks 
    Post.find(Like.group(:post_id).order('count(post_id) desc').limit(10).pluck(:post_id))
  end

  def self.search(search)
    return Post.all unless search
    Post.where('title LIKE(?)', "%#{search}%")
  end

  validates :title, :content, presence: true
end
