import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>
        Get help with anything life throws at you<br></br>
        Connect with a friendly volunteer over video chat and join our community
      </h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="https://venturebeat.com/wp-content/uploads/2018/01/javascript.jpg?fit=1800%2C1116&strip=all"
              text="Find help with all programming problems!"
              label="Javascript"
              path="/feeds"
            />
            <CardItem
              src="http://cdn.cnn.com/cnnnext/dam/assets/211116081538-restricted-juliens-auctions-eric-clapton-guitar-11-15-2021.jpg"
              text="Talk with someone about anything music related!"
              label="Music"
              path="/feeds"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/16:9/w_2580,c_limit/Cooking-Home-Collection.jpg"
              text="Get that recipe just right!"
              label="Cooking"
              path="/feeds"
            />
            <CardItem
              src="https://en.sormat.com/wp-content/uploads/sites/2/2020/05/Flat-TV-concrete-wall.jpg"
              text="Need some help hanging that flatscreen tv? We've got you covered! "
              label="Household Repair"
              path="/feeds"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Have a conversation about travel. Help me plan my next trip?"
              label="Travel"
              path="/feeds"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
