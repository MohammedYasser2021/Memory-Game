// splash screen variables
let splashBtn = document.querySelector('.control-btns span')
let splashScreen = document.querySelector('.control-btns')
let username = document.querySelector('.name span')

// when click on splash btn change username and hidden splash screen
splashBtn.addEventListener('click', function () {
  let yourName = prompt('What is Your Name ?')
  // if your name is empty, change your name to Unknown
  if (yourName == null || yourName == '') {
    username.innerHTML = 'Unknown'
  } else {
    // if your name is not empty, change your name to your name value
    username.innerHTML = yourName
  }
  splashScreen.style.transform = 'scale(0)'
  document.getElementById('background').play()
  // count down
  let countDown = setInterval(() => {
    // trigger function countdown timer
    secondPass()
  }, 1000)

  //  function countdown timer
  let timerSpan = document.querySelector('.time span')
  let seconds = 120

  function secondPass() {
    let minutes = Math.floor(seconds / 60)
    let remSeconds = seconds % 60
    if (remSeconds < 10) {
      remSeconds = `0${remSeconds}`
    }

    timerSpan.innerHTML = `${minutes} : ${remSeconds}`
    if (seconds > 0) {
      seconds = seconds - 1
    } else {
      clearInterval(countDown)
      timerSpan.innerHTML = 'Finish'
      timerSpan.style.color = 'crimson'

      // function display game over after losing
      if (document.querySelectorAll('.hasMatch').length !== blocks.length) {
        document.querySelector('.game-over').style.transform = 'scale(1)'
        document.getElementById('defeat').play()
        document.getElementById('background').pause()
        document
          .querySelector('.game-over-content button')
          .addEventListener('click', function () {
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
      }
    }
  }
})

let duration = 1000

// select blocks container
let memoryGameContainer = document.querySelector('.memory-game-blocks')

// create array contains all blocks
let blocks = Array.from(document.querySelectorAll('.game-block'))
// create range of keys
let orderRange = Array.from(Array(blocks.length).keys())
console.log(orderRange)
shuffle(orderRange)
console.log(orderRange)
// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index]

  // Add Click Event
  block.addEventListener('click', function () {
    // Trigger The Flip Block Function
    flipBlock(block)
  })
})

// flip block function
function flipBlock(selectedBlock) {
  // add class isflipped
  selectedBlock.classList.add('isflipped')

  // collect all flipped cards
  // let allFlippedBlocks = document.querySelectorAll('.isflipped')
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains('isflipped'),
  )
  console.log(allFlippedBlocks)
  // if there are two selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking()
    // check matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
  }

  function stopClicking() {
    // add class no clicking on maim=n container
    memoryGameContainer.classList.add('no-clicking')

    // wait duration
    setTimeout(() => {
      // remove class no-clicking after duration end
      memoryGameContainer.classList.remove('no-clicking')
    }, duration)
  }

  // check matched Blocks

  function checkMatchedBlocks(firstBlock, secondBlock) {
    let tries = document.querySelector('.tries span')

    if (firstBlock.dataset.custom === secondBlock.dataset.custom) {
      firstBlock.classList.remove('isflipped')
      secondBlock.classList.remove('isflipped')

      firstBlock.classList.add('hasMatch')
      secondBlock.classList.add('hasMatch')

      document.getElementById('win').play()
    } else {
      // tries.innerHTML = +tries.innerHTML + 1
      tries.innerHTML = parseInt(tries.innerHTML) + 1

      setTimeout(() => {
        firstBlock.classList.remove('isflipped')
        secondBlock.classList.remove('isflipped')
      }, duration)
      document.getElementById('lose').play()
    }

    // function display congratulations after winning
    if (document.querySelectorAll('.hasMatch').length === blocks.length) {
      document.querySelector('.successful').style.transform = 'scale(1)'
      document.getElementById('suc').play()
      document.getElementById('background').pause()
      document
        .querySelector('.successful-content button')
        .addEventListener('click', function () {
          setTimeout(() => {
            location.reload()
          }, 1000)
        })
    }
  }
}

// shuffle function
function shuffle(array) {
  // settings variables
  let current = array.length,
    temp,
    random
  while (current > 0) {
    // random number
    random = Math.floor(Math.random() * current)

    // decrease length by one
    current--

    // [1] save current element in stash
    temp = array[current]
    // [2] current element = random element
    array[current] = array[random]
    // [3] random element = get element from stash
    array[random] = temp
  }

  return array
}
