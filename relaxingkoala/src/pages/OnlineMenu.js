import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import ItemModal from "../scripts/ItemModal";
import "../styles/OnlineMenu.css"; // Keep your original CSS file

function OnlineMenu() {
  const [menu, setMenu] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const newMenu = new Menu();
    newMenu.populateMenu();
    setMenu(newMenu.categories);
    setActiveTab(Object.keys(newMenu.categories)[0]);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="menu-container p-4"> 
      <h1 className="menu-title text-3xl font-bold mb-4">Relaxing Koala</h1>
      <h2 className="menu-subtitle text-xl mb-6">Our Menu</h2>

      <div className="flex flex-wrap mb-6">
        {Object.keys(menu).map((category) => (
          <button
            key={category}
            className={`mr-4 px-4 py-2 rounded-lg focus:outline-none 
              ${
                activeTab === category
                  ? "bg-gray-300 text-gray-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            onClick={() => handleTabClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div>
        {activeTab && (
          <div className="menu-category"> 
            <ul className="category-list">
              {menu[activeTab].map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className="menu-item rounded-lg hover:shadow-lg transform transition duration-300 p-2" 
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === "Enter" && handleItemClick(item)}
                  aria-label={`View details for ${item.name}`}
                >
                  <div className="menu-item-content flex items-center justify-between">
                    <div className="menu-item-details">
                      <strong className="menu-item-name text-lg font-semibold">
                        {item.name}
                      </strong>
                      <p className="menu-item-desc text-gray-500 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                    <p className="menu-item-price text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedItem && (
        <ItemModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          item={selectedItem}
        />
      )}
    </div>
  );
}

export default OnlineMenu;