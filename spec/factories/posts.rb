FactoryBot.define do
  factory :post, class: Post do
    title       { 'hello!' }
    content     { 'yell' }
    images      { [FactoryBot.build(:image, post: nil)] }
    user
  end

  factory :post_no_image, class: Post do
    title       { 'hello!' }
    content     { 'yell' }
  end
end
