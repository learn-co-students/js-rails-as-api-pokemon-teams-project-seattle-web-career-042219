class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    if params[:trainer_id]
      trainer = Trainer.find(params[:trainer_id])
      if trainer.pokemons.count < 6
        pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
        render json: pokemon
      else
        render json: {error: "Party is Full!"}, status: 403
      end
    end
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: pokemon
  end

end
