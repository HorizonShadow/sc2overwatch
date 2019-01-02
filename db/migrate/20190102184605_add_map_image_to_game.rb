class AddMapImageToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :map_image, :string
  end
end
