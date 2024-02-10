function generateChalkFunction(color, isBold = false) {
  const style = `color: ${color};${isBold ? " font-weight: bold;" : ""}`;
  return (text) => `<span style="${style}">${text}</span>`;
}

const chalk = new Proxy(
  {
    // Basic color methods
    cyan: generateChalkFunction("cyan"),
    yellow: generateChalkFunction("#e9bb00"),
    green: generateChalkFunction("green"),
    red: generateChalkFunction("red"),
    blue: generateChalkFunction("#0303e0"),
    black: generateChalkFunction("black"), // Default color

    // Bold method for default (black)
    bold: generateChalkFunction("black", true),
  },
  {
    get: (target, prop) => {
      if (prop === "bold") {
        // Return the bold function with black as default
        return target[prop];
      } else if (target.hasOwnProperty(prop)) {
        // Return a function that will itself return another function for bold
        return new Proxy(target[prop], {
          get: (_target, nestedProp) => {
            if (nestedProp === "bold") {
              return generateChalkFunction(prop, true); // Use the prop as color
            }
            return _target[nestedProp];
          },
        });
      }
      return target[prop];
    },
  }
);

module.exports = { chalk };
