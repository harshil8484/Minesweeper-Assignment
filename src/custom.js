var gameboard = $('#gameboard');

function createGBoard(rows, grids, difficulty){
    gameboard.empty();
    for(let i=0; i < rows; i++){
        const row = $('<div>')
                    .addClass('row')
                    .attr('row-position', i);
        for(let j=0; j< grids; j++){
            const grid = $('<div>')
                            .addClass('box hide')
                            .attr('data-row',i)
                            .attr('data-col',j)
                            .attr('onclick','IsBomb(this)');
            if(Math.random() < 0.3){
                grid.addClass('bomb');
            }
            row.append(grid);
        }
        gameboard.append(row);
    }
    gameboard.fadeIn(3000);
}

createGBoard(10,10);
function IsBomb(event){
    const row = $(event).data('row');
    const grid = $(event).data('col');
    document.getElementById("click").play();
    console.log(row,grid);
    if($(event).hasClass('bomb')){
        gameOver(false);
    }
    else{
        Runbox(row, grid);
        const isGameOver = $('.box.hide').length === $('.box.bomb').length
        if (isGameOver) gameOver(true);
    }
}
function GameOver(win){
    if(win){
        reveal(i,j);
    }
    else{
        alert('you lose');
        Restart();
    }
}
function Restart(){
    createGBoard(10,10);
    $('.game-playback').hide();
}
function gameOver(isWin) {
  let message = null;
  let icon = null;
  if (isWin) {
    message = 'YOU WON!';
    icon = 'fa fa-flag';
  } else {
    message = 'YOU LOST!';
    icon = 'fa fa-bomb';
  }
  $('.box.bomb').addClass('found');
  setTimeout(function() {
  document.getElementById('bomb').play();
},300);
  $('.col:not(.bomb)')
    .html(function() {
      const $cell = $(this);
      const count = getMineCount(
        $cell.data('row'),
        $cell.data('box'),
      );
      return count === 0 ? '' : count;
    })
  $('.box.hide').removeClass('hide');
  setTimeout(function() {
    $('.game-playback').show();
  }, 1000);
}

const tRow = 10;
const tCol = 10;
function Runbox(oi, oj) {
  const seen = {};

  function helper(i, j) {

    if (i >= tRow || j >= tCol || i < 0 || j < 0) {return};
    const key = `${i} ${j}`
    if (seen[key]) {return};
    const $cell = $(`.box.hide[data-row=${i}][data-col=${j}]`);
    const mineCount = checkBombCount(i, j);
    if ( !$cell.hasClass('hide') || $cell.hasClass('bomb') ) {
      return;
    }

    $cell.removeClass('hide');

    if (mineCount) {
        console.log('asd');
      $cell.text(mineCount);
      return;
    }
    
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        helper(i + di, j + dj);
      }      
    }
  }

  helper(oi, oj);
}
function checkBombCount(i, j) {
  let count = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      const ni = i + di;
      const nj = j + dj;
       if (ni >= tRow || nj >= tCol || nj < 0 || ni < 0) continue;
      const $cell = $(`.box.hide[data-row=${ni}][data-col=${nj}]`);
      if ($cell.hasClass('bomb')) {count++;}
    }      
  }
  return count;
}

