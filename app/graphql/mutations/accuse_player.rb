module Mutations
  class AccusePlayer < GraphQL::Schema::Mutation
    field :game_player, Types::GamePlayerType, null: false

    argument :game_player_id, ID, required: true
    argument :winner_id, ID, required: true
    argument :verdict, String, required: true

    def resolve(game_player_id:, winner_id:, verdict:)
      game_player = GamePlayer.find(game_player_id)
      if game_player.voters.map(&:ip).include? context[:remote_ip]
        return GraphQL::UnauthorizedError.new("Already voted")
      end
      if game_player.player.id.to_s == winner_id
        if verdict == 'guilty'
          game_player.update(
              guilty_count: game_player.guilty_count + 1
          )
        else
          game_player.update(
              innocent_count: game_player.innocent_count + 1
          )
        end
      end

      Voter.create(
          ip: context[:remote_ip],
          game_player: game_player
      )

      {
        game_player: game_player
      }
    end
  end
end
