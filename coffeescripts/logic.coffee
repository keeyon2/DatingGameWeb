root = exports ? this
class Logic
    root.constructor = ->
        @initialize()
        
    root.initialize = ->
        @number_of_turns_remaining = 0
        @number_of_attributes = 0
        @max_score = -100
        @playerName = ""

        @current_attributes = []

    root.startGameMessage = (startGameMessage) ->
        @initialize()
        @playerName = startGameMessage['playername']

        level = startGameMessage['level']
        if level is 1
            attributes = 5
        else if level is 2
            attributes = 10
        else
            attributes = 15
        
        turns = startGameMessage['turns']

        @startGame(attributes, turns)

    root.startGame = (total_atr, total_turns) ->
        @number_of_turns_remaining = total_turns
        @number_of_attributes = total_atr
        @createCandidate()

    root.createCandidate = ->
        all_attributes = []
        console.log("Total number of Attributes: " + @number_of_attributes)
        number_of_positive_candidates = Math.floor(@number_of_attributes / 2)
        number_of_negative_candidates = @number_of_attributes - number_of_positive_candidates

        console.log "Positive candidate count: " + number_of_positive_candidates
        console.log "Negative candidate count: " + number_of_negative_candidates

        remaining_positive_value = 100
        remaining_negative_value = 100

        # Positive Candidates
        for candidate in [1..number_of_positive_candidates - 1]
            value = (Math.floor(Math.random() * remaining_positive_value))
            remaining_positive_value -= value
            value = value / 100
            all_attributes.push(value)

        all_attributes.push(remaining_positive_value / 100)

        # Negative Candidates
        for candidate in [1..number_of_negative_candidates - 1]
            value = (Math.floor(Math.random() * remaining_negative_value))
            remaining_negative_value -= value
            value = value / 100
            all_attributes.push(value * -1)

        all_attributes.push((remaining_negative_value / 100) * -1)
        @current_attributes = @shuffleArray(all_attributes)

    root.shuffleArray = (array) ->
        currentIndex = array.length

        while 0 isnt currentIndex
            # Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            # And swap it with the current element.
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue

        array

    root.turnMessage = (turnMessageJson) ->
        valuesArray = turnMessageJson['values']
        @turnMade(valuesArray)

    root.turnMade = (guessed_attributes) ->
        score = @scoreVector(guessed_attributes, @current_attributes)
        guiFunctionScoreMessage(score)
        if score > @max_score
            @max_score = score

        @number_of_turns_remaining--
        if @number_of_turns_remaining <= 0
            console.log "GAME OVER BABY, In backend"
            @gameOver()

    root.gameoverMessage = ->
        @gameOver()

    root.gameOver = ->
        guiFunctionEndGame(@max_score)
        @initialize()

    # Dot Product
    root.scoreVector =  (vectorA, vectorB) ->
        if vectorA.length isnt vectorB.length
            console.log "Score vector size wrong"
            console.log "VectorA length: " + vectorA.length
            console.log "VectorB length: " + vectorB.length
            throw "can't dot product different length arrays"

        score = 0
        for value, index in vectorA
            score += value * vectorB[index]
        score = score.toFixed(4)

