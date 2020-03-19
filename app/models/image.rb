class Image < ApplicationRecord
  belongs_to :post, inverse_of: :images
  mount_uploader :src, ImageUploader

  validates :src, presence: true
end
