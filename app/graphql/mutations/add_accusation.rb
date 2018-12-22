module Mutations
  class AddAccusation < GraphQL::Schema::Mutation
    field :game_player, Types::GamePlayerType, null: false

    argument :player_id, ID, required: true
    argument :game_id, ID, required: true
    argument :evidence, String, required: true

    def resolve(game_id:, evidence:, player_id:)
      game_player = GamePlayer.find_by(game_id: game_id, player_id: player_id)
      if game_player.voters.map(&:ip).include? context[:remote_ip]
        return GraphQL::UnauthorizedError.new("Already voted")
      end
      if game_player.evidence.nil?
        game_player.update(
          is_accused: true,
          guilty_count: game_player.guilty_count + 1,
          evidence: evidence
        )
      else
        game_player.update(
          is_accused: true,
          guilty_count: game_player.guilty_count + 1,
        )
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
