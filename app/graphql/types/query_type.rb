module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :players, [PlayerType], null: true do
      description 'Get all players'
    end

    field :search_players, [PlayerType], null: true do
      description 'Search players on a query'
      argument :query, String, required: true
    end

    field :games, [GamePlayerType], null: true do
      description 'Get game players for a player'
      argument :player_id, ID, required: true
    end

    field :accused_players, [GamePlayerType], null: true do
      description 'Get all accused players'
    end

    field :game_players, [GamePlayerType], null: true do
      description 'Get all game players'
    end

    field :game_player, GamePlayerType, null: true do
      description 'Get a game player'
      argument :player_id, ID, required: true
      argument :game_id, ID, required: true
    end

    def search_players(query:)
      Player
          .joins(:game_players)
          .where('lower(name) like :name and is_accused = :accused', name: "%#{query.downcase}%", accused: true)
          .group('players.id')
          .limit(10)
    end

    def games(player_id:)
      GamePlayer.where(player_id: player_id, is_accused: true).limit(25)
    end

    def players
      Player.joins(:game_players).where("game_players.is_accused = ?", true).group('players.id').limit(25)
    end

    def game_player(game_id:, player_id:)
      GamePlayer.find_by(game_id: game_id, player_id: player_id)
    end

    def game_players
      GamePlayer.all
    end

    def accused_players
      GamePlayer.where(is_accused: true).limit(25).order(:updated_at)
    end
  end
end
