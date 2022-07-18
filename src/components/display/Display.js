import './Display.css';

const imgPathMap = {
  aircraft: '/assets/img/aircraft_shape.png',
  battleship: '/assets/img/battleship_shape.png',
  carrier: '/assets/img/carrier_shape.png',
  cruiser: '/assets/img/cruiser_shape.png',
  submarine: '/assets/img/submarine_shape.png',
}

function ShipItem({shipType, shipSize, curHealth}) {
  // console.log(shipType, shipSize, curHealth);
  return(
    <div className='ship-item'>
      <div>
        <img src={imgPathMap[shipType]} alt={shipType} height='50' title={shipType}></img>
      </div>
      <div className='shape-item-state'>
        {new Array(shipSize).fill(0).map((item, idx) => {
          return (<div className={idx < curHealth ? 'ship-item-hit' : 'ship-item-miss'} key={idx} ></div>)
        })}
      </div>
    </div>
  );
}

function Display({ shapes, shipState, shipTypes }) {
  // console.log(shapes, shipTypes)
  return (
    <>
      <div className='display-container'>
        <section className='players'>
          <div className='player-score'>
            <p className='player-score-text'>00</p>
            <hr />
            <p className='player-name'>Player 1</p>
          </div>
          <div className='player-score'>
            <p className='player-score-text'>00</p>
            <hr />
            <p className='player-name'>Player 2</p>
          </div>
        </section>

        <section className='ship-list'>
          {shapes.map((item, idx) => {
            return(
              <ShipItem key={idx} shipType={item.ship} shipSize={shipTypes[item.ship].size} curHealth={shipState[item.ship]?.hits}></ShipItem>
            )
          })}
        </section>
      </div>
    </>
  );
}

export default Display;
