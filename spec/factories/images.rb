FactoryBot.define do
  factory :image do
    src { File.open(Rails.root.join('app/assets/images/paper.jpg')) }
    association :post
  end
end
