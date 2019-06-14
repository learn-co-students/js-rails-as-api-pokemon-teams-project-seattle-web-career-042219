class PokemonsController < ApplicationController


    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
         byebug
        if trainer.has_space?
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
            render json: PokemonSerializer.new(pokemon).to_serialized_json
        else

        end
    end



    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end
end
