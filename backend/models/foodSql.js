const createFoodTable = `
CREATE TABLE food_combinations (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    ingredients JSON NOT NULL,
    cuisine VARCHAR(100) NOT NULL,
    meal_type VARCHAR(100) NOT NULL,
    created_by INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);
`;

module.exports = createFoodTable;
