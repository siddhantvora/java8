package com.app.maker;

import com.app.drink.CoffeeDrink;
import com.app.drink.Drink;
import com.app.drink.DrinkType;

public class CoffeeMaker implements Maker {

	@Override
	public CoffeeDrink make() {
		// TODO Auto-generated method stub
		return (CoffeeDrink)Drink.DrinkFactory.getDrink(DrinkType.COFFEE);
	}

}
