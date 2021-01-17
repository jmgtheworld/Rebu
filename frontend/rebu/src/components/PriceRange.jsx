const priceRange = [];
const distance = 12;

const priceRangeGenerator = distance => {
  const priceRange = [];
  const medianPrice = (distance * 2.0);
  const startingPrice = medianPrice - 2.0;
  const highestPrice = medianPrice + 3.0;

  for (let i = startingPrice; i <= highestPrice; i++) {
    priceRange.push({
      price: i
    })
  }

  return priceRange
}

const PriceRange = priceRangeGenerator(distance)
 
export default PriceRange