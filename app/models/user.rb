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
  has_many :comments, dependent: :destroy
  # いいね
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post
  # フォロー一覧
  has_many :active_relationships, class_name:
    'Relationship', foreign_key:
    :following_id, dependent:
    :destroy
  has_many :followings, through: :active_relationships, source: :follower
  # フォロワー一覧
  has_many :passive_relationships, class_name:
    'Relationship', foreign_key:
    :follower_id, dependent:
    :destroy
  has_many :followers, through: :passive_relationships, source: :following

  def followed_by?(user)
    passive_relationships.find_by(following_id: user.id).present?
  end

  validates :name, length: { maximum: 10 }, presence: true
  validates :profile, length: { maximum: 100 }
end
