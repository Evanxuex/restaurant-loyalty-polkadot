import React from 'react';

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  return (
    <div className="menu-section">
      <h2>Our Menu</h2>
      
      <div className="menu-category">
        <h3>Milk Teas</h3>
        <div className="menu-item">
          <div className="menu-item-header">
            <h4 className="menu-item-name">Classic Pearl Milk Tea</h4>
            <span className="menu-item-price">$5.25</span>
          </div>
          <p className="menu-item-description">Black tea + milk + golden tapioca pearls</p>
        </div>
      </div>
      
      <div className="menu-category">
        <h3>Fruit Teas</h3>
        <div className="menu-item">
          <div className="menu-item-header">
            <h4 className="menu-item-name">Mango Sunrise Tea</h4>
            <span className="menu-item-price">$5.75</span>
          </div>
          <p className="menu-item-description">Mango + passionfruit tea + real mango bits</p>
        </div>
        <div className="menu-item">
          <div className="menu-item-header">
            <h4 className="menu-item-name">Lychee Blossom Green Tea</h4>
            <span className="menu-item-price">$5.50</span>
          </div>
          <p className="menu-item-description">Lychee-infused green tea</p>
        </div>
      </div>
      
      <div className="menu-category">
        <h3>Specialty Drinks</h3>
        <div className="menu-item">
          <div className="menu-item-header">
            <h4 className="menu-item-name">Brown Sugar Cloud</h4>
            <span className="menu-item-price">$6.25</span>
          </div>
          <p className="menu-item-description">Fresh milk + brown sugar syrup + brown sugar pearls</p>
        </div>
        <div className="menu-item">
          <div className="menu-item-header">
            <h4 className="menu-item-name">Matcha Lemon Fizz</h4>
            <span className="menu-item-price">$6.00</span>
          </div>
          <p className="menu-item-description">Sparkling matcha + lemon tea</p>
        </div>
        <div className="menu-item">
          <div className="menu-item-header">
            <h4 className="menu-item-name">Strawberry Jasmine Tea</h4>
            <span className="menu-item-price">$5.75</span>
          </div>
          <p className="menu-item-description">Jasmine tea + strawberry purée</p>
        </div>
        <div className="menu-item">
          <div className="menu-item-header">
            <h4 className="menu-item-name">Honeydew Milk Tea</h4>
            <span className="menu-item-price">$5.50</span>
          </div>
          <p className="menu-item-description">Honeydew flavor + milk</p>
        </div>
      </div>
      
      <div className="menu-category">
        <h3>Add-Ons (+$0.75)</h3>
        <div className="add-ons">
          <span className="add-on">Extra Boba (Pearls)</span>
          <span className="add-on">Aloe Vera</span>
          <span className="add-on">Lychee Jelly</span>
          <span className="add-on">Crystal Boba</span>
          <span className="add-on">Grass Jelly</span>
          <span className="add-on">Pudding</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
