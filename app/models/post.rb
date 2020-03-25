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

  validates :title, length: { maximum: 20 }, presence: true
  validates :content, length: { maximum: 300 }, presence: true
  validates :images, presence: true
  validates_associated :images
  before_validation :delete_whitespace
 
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
    Post.find(Like.group(:post_id).order(
      Arel.sql('count(post_id) desc')
    ).limit(10).pluck(:post_id))
  end

  def self.search(search)
    return Post.all unless search

    Post.where('title LIKE(?)', "%#{search}%")
    Post.where('content LIKE(?)', "%#{search}%")
  end

  private
    def delete_whitespace
      self.title = title.rstrip
      self.content = content.rstrip
    end
end
