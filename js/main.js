// ts-check
const choices = document.querySelectorAll('.choice')
const score = document.getElementById('score')
const result = document.getElementById('result')
const restart = document.getElementById('restart')
const modal = document.querySelector('.modal')

const scoreboard = {
  player: 0,
  computer: 0,
}

/**
 * Titlelize a word: Make a word with only the first letter uppercased
 *
 * @param {string} word
 * @returns {string}
 */
const titleize = word => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * Play game
 * @param {Event} e
 */
function play(e) {
  restart.style.display = 'inline-block'
  const playerChoice = e.target.id
  const computerChoice = getComputerChoice()
  const winner = getWinner(playerChoice, computerChoice)
  showWinner(winner, computerChoice)
}

/**
 * Get computer's choice
 * @returns {string}
 */
function getComputerChoice() {
  const rand = Math.random()
  if (rand < 0.34) {
    return 'rock'
  } else if (rand <= 0.67) {
    return 'paper'
  } else {
    return 'scissors'
  }
}

/**
 *
 * @param {string} p Player's choice
 * @param {string} c Computer's choice
 * @returns {boolean}
 */
function getWinner(p, c) {
  if (p === c) {
    return 'draw'
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer'
    } else {
      return 'player'
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer'
    } else {
      return 'player'
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer'
    } else {
      return 'player'
    }
  }
}

/**
 *
 * @param {string} winner
 * @param {string} computerChoice
 */
function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Increment player score
    scoreboard.player++
    // Show modal result
    result.innerHTML = `
        <h1 class="text-win">You Win</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x" aria-hidden="true"></i>
	    <p>Computer Chose <strong>${titleize(computerChoice)}</strong></p>
        `
  } else if (winner === 'computer') {
    // Increment compter score
    scoreboard.computer++
    // Show modal result
    result.innerHTML = `
        <h1 class="text-lose">You Lose</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x" aria-hidden="true"></i>
	    <p>Computer Chose <strong>${titleize(computerChoice)}</strong></p>
        `
  } else {
    // Show modal result
    result.innerHTML = `
        <h1>It's A Draw</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x" aria-hidden="true"></i>
	    <p>Computer Chose <strong>${titleize(computerChoice)}</strong></p>
        `
  }

  // Show score
  score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Computer: ${scoreboard.computer}</p>
        `
  modal.style.display = 'block'
}

/**
 * Clear modal
 *
 * @param {MouseEvent} e
 */
function clearModal(e) {
  if (e.target === modal) {
    modal.style.display = 'none'
  }
}

/**
 * Restart game
 */
function restartGame() {
  scoreboard.player = 0
  scoreboard.computer = 0
  score.innerHTML = `
      <p>Player: 0</p>
	  <p>Computer: 0</p>
    `
  restart.style.display = 'none'
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play))
window.addEventListener('click', clearModal)
restart.addEventListener('click', restartGame)
