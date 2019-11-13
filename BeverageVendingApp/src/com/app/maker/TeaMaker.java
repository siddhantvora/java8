package com.app.maker;

import com.app.drink.Drink;
import com.app.drink.DrinkType;
import com.app.drink.TeaDrink;

public class TeaMaker implements Maker{

	public TeaDrink make() {
		 
		return (TeaDrink) Drink.DrinkFactory.getDrink(DrinkType.TEA);
	}

}
