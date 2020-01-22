class Post < ApplicationRecord
  mount_uploader :images, ImagesUploader

  belongs_to :user
  has_many :favorites, dependent: :destroy
  has_many :favorited_users, through: :favorites, source: :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user

  def favorite_user(user_id)
    favorites.find_by(user_id: user_id)
   end
  
  def like_user(user_id)
    likes.find_by(user_id: user_id)
  end

  def self.create_all_ranks 
    Post.find(Like.group(:post_id).order('count(post_id) desc').limit(10).pluck(:post_id))
  end

  validates :title, :content, :images, presence: true
end
