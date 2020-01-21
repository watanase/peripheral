class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  mount_uploader :avatar, AvatarUploader

  has_many :posts
  has_many :comments
  has_many :likes
  has_many :favorites
  has_many :posts_favorites, through: :favorites, source: :post

  def like(post)
    favorites.find_or_create_by(post_id: post.id)
  end

  def unlike(post)
    favorite = favorites.find_by(post_id: post.id)
    favorite.destroy if favorite
  end
end
