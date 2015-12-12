root = exports ? this
class Logic
    root.constructor = ->
        @initialize()
        
    root.initialize = ->
        @number_of_turns_remaining = 0
        @number_of_attributes = 0
        @max_score = -100

        @current_attributes = []

    root.startGame = (total_atr, total_turns) ->
        @number_of_turns_remaining = total_atr
        @number_of_attributes = total_turns
        @createCandidate()

    root.createCandidate = ->
        all_attributes = []
        number_of_positive_candidates = @number_of_attributes / 2
        number_of_negative_candidates = @number_of_attributes - number_of_positive_candidates
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

	root.turnMade = (guessed_attributes) ->
		score = @scoreVector(guessed_attributes, @current_attributes)
        callGUIFunctionScoreMessage(score)
		if score > @max_score
			@max_score = score

        @number_of_turns_remaining--
        if @number_of_turns_remaining <= 0
            @gameIsOver

    root.gameOver = ->
        callGUIFunctionEndGame(@max_score)

    # Dot Product
    root.scoreVector =  (vectorA, vectorB) ->
        if vectorA.length isnt vectorB.length
            throw "can't dot product different length arrays"
        score = 0
        for value, index in vectorA
            score += value * vectorB[index]
        score = score.toFixed(4)

