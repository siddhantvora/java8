package com.app.drink;

import java.util.Map;

import com.app.container.Ingredient;
import com.app.container.Waste;

public class TeaDrink extends Drink{
	
	public TeaDrink(Map<Ingredient, Double> ingredients,Map<Waste, Double> wastes,Double price) {
		super(ingredients,wastes,price);
		
	}



}
