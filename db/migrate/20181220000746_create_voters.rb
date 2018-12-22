class CreateVoters < ActiveRecord::Migration[5.2]
  def change
    create_table :voters do |t|
      t.string :ip
      t.belongs_to :game_player, foreign_key: true
      t.timestamps
    end
  end
end
