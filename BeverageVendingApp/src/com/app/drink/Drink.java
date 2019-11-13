package com.app.drink;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.app.container.Container;
import com.app.container.Ingredient;
import com.app.container.Waste;

public abstract class Drink {
	private Map<Ingredient, Double> ingredients;
	private Map<Waste, Double> wastes;
	private Double price;

	public Drink(Map<Ingredient, Double> ingredients,Map<Waste, Double> wastes, Double price) {
		super();
		if (isAvailable(ingredients)) {
			this.ingredients = ingredients;
			this.price = price;
			this.wastes=wastes;
			writeWaste(wastes);
		}
	}

	private void writeWaste(Map<Waste, Double> wastes2) {

		
	}

	private Boolean isAvailable(Map<Ingredient, Double> ingredients) {
		// TODO Auto-generated method stub
		Set<Ingredient> ingredientsSet = ingredients.keySet();

		// ingredientsSet.forEach((ingredient)->{Container.getContainer().getContents().get(ingredient).isAvailable(ingredients.get(ingredient));
		for (Ingredient ingredient : ingredientsSet) {
			Boolean flag = Container.getContainer().getContents().get(ingredient)
					.isAvailable(ingredients.get(ingredient));
			if (!flag) {

				return false;
			}
		}

		return true;
	}

	public Map<Ingredient, Double> getIngredients() {
		return ingredients;
	}

	public void setIngredients(Map<Ingredient, Double> ingredients) {
		this.ingredients = ingredients;
	}
 
	@Override
	public String toString() {
		return "Drink [ingredients=" + ingredients + ", wastes=" + wastes + ", price=" + price + "]";
	}

	public Map<Waste, Double> getWastes() {
		return wastes;
	}

	public void setWastes(Map<Waste, Double> wastes) {
		this.wastes = wastes;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public static class DrinkFactory {
		public static Drink getDrink(DrinkType drinkType) {
			Drink drink = null;

			switch (drinkType) {
			case TEA:

				Map<Ingredient, Double> teaIngredients = new HashMap<>();
				teaIngredients.put(Ingredient.MILK, 40.0);
				teaIngredients.put(Ingredient.SUGAR, 15.0);
				teaIngredients.put(Ingredient.WATER, 60.0);
				teaIngredients.put(Ingredient.TEA, 5.0);
				Map<Waste, Double> teaWastes=new HashMap<>();
				teaWastes.put(Waste.TEAWASTE, 1.0);
				teaWastes.put(Waste.MILKWASTE,4.0);
				teaWastes.put(Waste.WATERWASTE, 5.0);
				teaWastes.put(Waste.SUGARWASTE, 2.0);
				Double teaPrice = new Double(10);
				drink = new TeaDrink(teaIngredients,teaWastes, teaPrice);

				break;
			case COFFEE:
				Map<Ingredient, Double> coffeeIngredients = new HashMap<>();
				coffeeIngredients.put(Ingredient.MILK, 80.0);
				coffeeIngredients.put(Ingredient.SUGAR, 15.0);
				coffeeIngredients.put(Ingredient.WATER, 20.0);
				coffeeIngredients.put(Ingredient.COFFEE, 4.0);
				Map<Waste, Double> coffeeWastes=new HashMap<>();
				coffeeWastes.put(Waste.COFFEEWASTE, 1.0);
				coffeeWastes.put(Waste.MILKWASTE,8.0);
				coffeeWastes.put(Waste.WATERWASTE, 3.0);
				coffeeWastes.put(Waste.SUGARWASTE, 2.0);
				Double coffeePrice = new Double(15);
				drink = new CoffeeDrink(coffeeIngredients,coffeeWastes, coffeePrice);
				break;
			}
			return drink;
		}
	}
}
