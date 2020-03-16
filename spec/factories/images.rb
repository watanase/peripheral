FactoryBot.define do
  factory :image do
    src { File.open(Rails.root.join('app/assets/images/com.jpg')) }
    association :post
  end
end
