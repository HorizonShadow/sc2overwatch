module Types
  class GameType < Types::BaseObject
    field :id, ID, null: false
    field :map, String, null: false
    field :map_image, String, null: true
    field :date, String, null: false
    field :url, String, null: false
    field :format, String, null: false
    field :game_type, String, null: false
    field :season_id, Integer, null: true
    field :replay_version, String, null: false
    field :players, [PlayerType], null: false
  end
end
