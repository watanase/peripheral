FactoryBot.define do
  factory :post, class: Post do
    user_id     { '1' }
    title       { 'hello!' }
    content     { 'yell' }
    images      { [FactoryBot.build(:image, post: nil)] }
    user
  end

  factory :post_no_image, class: Post do
    user_id     { '1' }
    title       { 'hello!' }
    content     { 'yell' }
    user
  end
end
