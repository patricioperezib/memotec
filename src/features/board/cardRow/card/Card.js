import React from 'react';
// Add import statements below
import {useSelector} from 'react-redux';
import {selectVisibleIDs} from '../../boardSlice.js';
import {useDispatch} from 'react-redux';
import {flipCard, selectMatchedIDs, resetCards} from '../../boardSlice.js'


let cardLogo = "https://imagens.brasil.elpais.com/resizer/kDD-n_HHpG2-mbY1cXlWGse5JIQ=/414x0/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/GSPZP3XDTBRDU2DGSU4TYPD77Q.jpg";

export const Card = ({ id, contents }) => {
  // Add selected data and dispatch variables below
const dispatch = useDispatch();  
  const visibleIDs = useSelector(selectVisibleIDs);
  const matchedIDs = useSelector(selectMatchedIDs);

  // flip card action
  const flipHandler = (id) => {
    // Add action dispatch below
    dispatch(flipCard(id));
  };
// new try by card
const tryAgainHandler = () => {
    // Add action dispatch below
 dispatch(resetCards());   
  };
  let cardStyle = 'resting'
  let click = () => flipHandler(id);
  
  let cardText = (
    <img src={cardLogo} className="logo-placeholder" alt="Card option" />
  );

  // 1st if statement
  // implement card id array membership check
  if (visibleIDs.includes(id) || matchedIDs.includes(id)) {
    cardText = contents;
    click = () => {};
  }

  // 2nd if statement
  // implement card id array membership check
  if (matchedIDs.includes(id)  ) {
    cardStyle = 'matched';
  };
  
   if (!matchedIDs.includes(id) && visibleIDs.length >= 2){
  cardStyle = "no-match"
   };

  // 3rd if statement
  // implement number of flipped cards check
  if (visibleIDs.length===2) {
    click = tryAgainHandler;
  }

  return (
    <button onClick={click} className={`card ${cardStyle}`}>
      {cardText}
    </button>
  );
};
