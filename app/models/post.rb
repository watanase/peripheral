class Post < ApplicationRecord
  mount_uploader :images, ImagesUploader

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :favorites
  has_many :users_favorites, through: :favorites
  
  def like_user(user_id)
    likes.find_by(user_id: user_id)
  end

  validates :title, :content, :images, presence: true
end
