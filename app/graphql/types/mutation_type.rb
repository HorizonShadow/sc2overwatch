module Types
  class MutationType < Types::BaseObject
    field :add_accusation, mutation: Mutations::AddAccusation
    field :accuse_player, mutation: Mutations::AccusePlayer
  end
end
