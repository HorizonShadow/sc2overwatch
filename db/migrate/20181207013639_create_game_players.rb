class CreateGamePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :game_players do |t|
      t.boolean :is_accused
      t.boolean :winner
      t.text :evidence
      t.string :clan
      t.string :race
      t.integer :mmr
      t.string :division
      t.integer :server_rank
      t.integer :global_rank
      t.integer :apm
      t.integer :team
      t.string :color
      t.integer :guilty_count, default: 0
      t.integer :innocent_count, default: 0

      t.belongs_to :game, foreign_key: true
      t.belongs_to :player, foreign_key: true
      t.timestamps
    end
  end
end
