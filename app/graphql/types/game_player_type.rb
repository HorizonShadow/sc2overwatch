module Types
  class GamePlayerType < Types::BaseObject
    field :id, ID, null: false
    field :is_accused, Boolean, null: true
    field :winner, Boolean, null: false
    field :evidence, String, null: true
    field :clan, String, null: false
    field :race, String, null: false
    field :mmr, Integer, null: false
    field :division, String, null: false
    field :server_rank, Integer, null: false
    field :global_rank, Integer, null: false
    field :apm, Integer, null: false
    field :team, Integer, null: false
    field :color, String, null: false
    field :guilty_count, Integer, null: false
    field :innocent_count, Integer, null: false
    field :player, PlayerType, null: false
    field :game, GameType, null: false
    field :updated_at, String, null: true
    field :created_at, String, null: true
  end
end
