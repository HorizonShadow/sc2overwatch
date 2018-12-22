module Types
  class PlayerType < Types::BaseObject
    field :id, ID, null: false
    field :bnet_url, String, null: true
    field :server, String, null: true
    field :bnet_id, Integer, null: true
    field :name, String, null: true
    field :game_players, [GamePlayerType], null: true
  end
end
