app.service('GameManager', function (CharactersService) {

    var _computerChoice;
    var _game = {
        characters: CharactersService.getCharacters(),
        propertyList: CharactersService.getPropertyList(),
    };
    _game.message = "Can you guess?"
    var _taunt = ["You Suck", "You're going to have to do better", "Weak!", "hahah!"];

    this.newGame = function () {
        setRandomChoice();
        reset();
        return _game;
    }

    this.checkGuess = function (character) {
        //THIS ALLOWS YOU TO CHECK EACH CHARACTER INDIVIDUALLY
        //NO MODIFICATION NEEDED HERE
        if (gameOver()) { return }
        if (character === _computerChoice) {
            _game.victory = true;
        } else {
            character.possible = false;
        }
        _game.guesses++;
    }

    this.checkProperty = function (prop) {
        if (gameOver()) { return }
        // console.log(prop)
        _game.guesses += _game.traitsCost;
        _game.traitsCost++;
        var min = 0;
        var max = _taunt.length;
        var rand2 = Math.floor(Math.random() * (max - min)) + min;
        _game.message = _taunt[rand2];
        

             
        
        /**  CAN GUESS
         * Check if the traitCost is greater than remaning guesses
         * totalGuesses = 10; guesses starts at 0 and should be for each guess
         * the traitCost starts at 2 and goes up by one for each propertyCheck
         * Dont forget to add the traitCost to the _game.guesses
         * setting _game.message will provide the user with feedback
         */
        var hasProp = false;
        for (var i = 0; i < _computerChoice.traits.length; i++) {
            console.log(_computerChoice.traits[i])
            if (_computerChoice.traits[i] === prop.name) {
                hasProp = true;
                prop.used = true
            }
        }
        /**  _COMPUTERCHOICE has TRAIT
         * _computerChocie.traits === [String, String]
         * check if _computerChoice.traits has the selected prop.name if so set hasProp = true;
         * also set prop.used = true to disable the same trait check
         */


        var found = false;
        for (var i = 0; i < _game.characters.length; i++) {
            found = false;
            var character = _game.characters[i];
            for (var j = 0; j < character.traits.length; j++) {
                var trait = character.traits[j];
                if (trait === prop.name) {
                    found = true;
                }
            }
            if (hasProp && !found) {
                character.possible = false;
                console.log(character)
            }
            if (!hasProp && found) {
                character.possible = false;
            }

        }
        
        /** EACH CHARACTER HAS TRAIT
         * now check each _game.characters individually
         * if the character.traits has prop.name set 
         * found = true
         * after checking the traits
         *  
         * if hasProp && !found 
         * character.possible = false
         * 
         * What else would cause a character.possible to === false?
         * 
         */
    }

    function reset() {
        for (var i = 0; i < _game.characters.length; i++) {
            _game.characters[i].possible = true;
        }
        for (var key in _game.propertyList) {
            _game.propertyList[key].used = false;
        }
        _game.guesses = 0;
        _game.traitsCost = 2;
        _game.computerChoice = false;
        /**
         * Reset all of the values on _game
         * each character on _game.characters should set to 
         * character.possible = true
         * all of the traits in  _game.propertyList <--- its an {}
         * should be set to 
         * _game.propertyList[trait].used = false
         */
    }

    function gameOver() {
        if (_game.guesses < 10) {
            return false;
        } if (_game.guesses >= 10) {
            alert("You Lose");
        }
        if (_game.victory) {
            _game.computerChoice = _computerChoice;
        }

        return true;
    
        /**
         * make sure the guesses are less than 10 
         * return true if the game should be over
         * if the game.victory 
         * set _game.computerChoice = _computerChoice
         * return true
         */
    }

    function setRandomChoice() {
        var min = 0;
        var max = _game.characters.length;
        var rand = Math.floor(Math.random() * (max - min)) + min;
        _computerChoice = _game.characters[rand];
        // console.log(_computerChoice)
        // console.log(rand);
        /**
         * This function should get a random index between 0 - _game.characters.length
         * then set _computerChoice to the object at the randI index
         */
    }

})