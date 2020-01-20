class Post < ApplicationRecord
  mount_uploader :images, ImagesUploader

  belongs_to :user
  has_many :comments

  validates :title, :content, :images, presence: true
end
