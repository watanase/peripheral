class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  mount_uploader :avatar, AvatarUploader

  # 投稿
  has_many :posts, dependent: :destroy
  # お気に入り
  has_many :favorites, dependent: :destroy
  has_many :favorited_posts, through: :favorites, source: :post
  # コメント
  has_many :comments
  # いいね
  has_many :likes
  has_many :liked_posts, through: :likes, source: :post
  # フォロー一覧
  has_many :relationships
  has_many :followings, through: :relationships, source: :follow
  #フォロワー一覧
  has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id'
  has_many :followers, through: :reverse_of_relationships, source: :user

  def follow(other_user)
    unless self == other_user
      self.relationships.find_or_create_by(follow_id: other_user.id)
    end
  end

  def unfollow(other_user)
    relationship = self.relationships.find_by(follow_id: other_user.id)
    relationship.destroy if relationship
  end

  def following?(other_user)
    self.followings.include?(other_user)
  end
end
