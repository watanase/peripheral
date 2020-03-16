require 'rails_helper'

describe Post do
  describe '#create' do
    context '登録できる場合' do
      it 'title, content, imageがあれば登録できる' do
        post = build(:post)
        expect(post).to be_valid
      end

      it 'titleが20文字以内だと登録できる' do
        num = 'n' * 20
        post = build(:post, title: num)
        expect(post).to be_valid
      end

      it 'contentが300文字以内だと登録できる' do
        num = 'n' * 300
        post = build(:post, content: num)
        expect(post).to be_valid
      end
    end

    context '登録できない場合' do
      it 'titleがなければ登録できない' do
        post = build(:post, title: nil)
        post.valid?
        expect(post.errors[:title]).to include('を入力してください')
      end

      it 'contentがなければ登録できない' do
        post = build(:post, content: nil)
        post.valid?
        expect(post.errors[:content]).to include('を入力してください')
      end

      it 'imageがなければ登録できない' do
        post = build(:post_no_image)
        post.valid?
        expect(post.errors[:images]).to include('を入力してください')
      end

      it 'titleが21文字以上だと登録できない' do
        num = 'n' * 21
        post = build(:post, title: num)
        post.valid?
        expect(post.errors[:title]).to include('は20文字以内で入力してください')
      end

      it 'contentが300文字以上だと登録できない' do
        num = 'n' * 301
        post = build(:post, content: num)
        post.valid?
        expect(post.errors[:content]).to include('は300文字以内で入力してください')
      end
    end
  end
end
