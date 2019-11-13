package com.app.container;

import java.util.HashMap;
import java.util.Map;

public class Container {
	private static Container container;
	private  Map<Ingredient,Content> contents;
	private Container() {
		
		
	}
	public static Container getContainer() {
		if(container ==null) {
			container=new Container();
			container.contents=new HashMap<>();
			container.contents.put(Ingredient.COFFEE, new Content(2000.0, 2000.0));
			container.contents.put(Ingredient.TEA, new Content(2000.0, 2000.0));
			container.contents.put(Ingredient.SUGAR, new Content(8000.0, 8000.0));
			container.contents.put(Ingredient.MILK, new Content(10000.0, 10000.0));
			container.contents.put(Ingredient.WATER, new Content(15000.0, 15000.0));
		}
		return container;
	}
	public Map<Ingredient, Content> getContents() {
		return contents;
	}
	public void setContents(Map<Ingredient, Content> contents) {
		this.contents = contents;
	}
	

}
