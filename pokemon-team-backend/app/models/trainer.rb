class Trainer < ApplicationRecord
    has_many :pokemons


    def has_space? 
        if trainer.pokemons.length >=  6
            false
        else
            true
        end

    end
end
