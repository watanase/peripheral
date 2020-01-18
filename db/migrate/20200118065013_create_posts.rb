class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :title, null: false
      t.text :text, null: false
      t.string :image
      t.timestamps
    end
  end
end
