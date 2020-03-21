class Image < ApplicationRecord
  belongs_to :post
  mount_uploader :src, ImageUploader

  # validates :src, presence: true
end
