class Post < ApplicationRecord
  mount_uploader :images, ImagesUploader
  has_many :posts

  validates :title, :content, :images, presence: true
end
