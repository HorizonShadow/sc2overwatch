class ReplayController < ApplicationController
  def upload
    file = params[:file].tempfile
    client = Sc2replaystats::Client.new(
      Rails.application.credentials.config[:sc2replaystats_auth],
      Rails.application.credentials.config[:sc2replaystats_hash]
    )
    replay = Sc2replaystats::Replay.new(client)
    resp = replay.upload(file)
    queue_id = resp['replay_queue_id']
    result = nil
    10.times do
      upload_status = replay.upload_status(queue_id)
      unless upload_status['replay_id']
        sleep 1
        next
      end
      replay_info = replay.replay_info(upload_status['replay_id'], :players)
      game = Game.where(id: replay_info['replay_id']).first_or_create(
        id: replay_info['replay_id'],
        map: replay_info['map_name'],
        date: replay_info['replay_date'],
        url: replay_info['replay_url'],
        format: replay_info['format'],
        game_type: replay_info['game_type'],
        season_id: replay_info['season_id'],
        replay_version: replay_info['replay_version']
      )
      replay_info['players'].each do |data|
        player = Player.where(id: data['players_id']).first_or_create(
          id: data['players_id'],
          bnet_url: data['player']['battle_net_url'],
          server: data['player']['battle_net_url'].split('.')[0].split('//')[1],
          bnet_id: data['player']['character_link_id'],
          name: data['player']['players_name']
        )
        if data['player']['players_name'] != player.name
          player.update(name: data['players_name'])
        end
        GamePlayer.where(game: game, player: player).first_or_create(
          player: player,
          game: game,
          winner: data['winner'] == 1,
          clan: data['clan'],
          race: data['race'],
          mmr: data['mmr'],
          division: data['division'],
          server_rank: data['server_rank'],
          global_rank: data['global_rank'],
          apm: data['apm'],
          team: data['team'],
          color: data['color']
        )
      end
      result = replay_info
      break
    end
    if result
      render json: result
    else
      render nothing: true, status: 500
    end
  end
end
